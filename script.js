// script.js
// front end behaviour for EKEDC community reporting form
// behaviour summary
// - result box shows only after successful submit
// - result box remains until user clicks Close
// - form resets only after Close is clicked
// - map does not collapse on submit

const API_ENDPOINT = 'http://127.0.0.1:5000/api/submit';
const STATUS_ENDPOINT = 'http://127.0.0.1:5000/api/report';

const useLocationBtn = document.getElementById('useLocation');
const mapContainer = document.getElementById('mapContainer');
const coordsEl = document.getElementById('coords');
const reportForm = document.getElementById('reportForm');
const mediaInput = document.getElementById('media');
const resultBox = document.getElementById('result');
const refEl = document.getElementById('ref');
const anonymousCheckbox = document.getElementById('anonymous');
const contactWrapper = document.getElementById('contactWrapper');
const checkStatusBtn = document.getElementById('checkStatusBtn');
const ticketInput = document.getElementById('ticketId');
const statusResult = document.getElementById('statusResult');
const closeResultBtn = document.getElementById('closeResult');

let coords = null;
let map = null;
let marker = null;

// make sure result box is hidden on load
resultBox.classList.add('hidden');

// toggle contact wrapper based on anonymous
anonymousCheckbox.addEventListener('change', () => {
  contactWrapper.classList.toggle('hidden', anonymousCheckbox.checked);
});

// request geolocation and show map preview
useLocationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser');
    return;
  }

  useLocationBtn.disabled = true;
  useLocationBtn.textContent = 'Locating...';

  navigator.geolocation.getCurrentPosition((position) => {
    useLocationBtn.disabled = false;
    useLocationBtn.textContent = 'Use my location';

    coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    showMapPreview(coords);
  }, (err) => {
    useLocationBtn.disabled = false;
    useLocationBtn.textContent = 'Use my location';
    console.error('geolocation error', err);
    alert('Unable to fetch location. Please enter address manually');
  }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 });
});

function showMapPreview(c) {
  // always keep map container visible once user captured location
  mapContainer.classList.remove('hidden');
  mapContainer.setAttribute('aria-hidden', 'false');

  // create Leaflet map if needed
  if (!map) {
    map = L.map('map', { attributionControl: false }).setView([c.lat, c.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  } else {
    map.setView([c.lat, c.lng], 16);
  }

  // add or move marker
  if (!marker) {
    marker = L.marker([c.lat, c.lng]).addTo(map);
  } else {
    marker.setLatLng([c.lat, c.lng]);
  }

  coordsEl.textContent = `Latitude: ${c.lat.toFixed(6)} Longitude: ${c.lng.toFixed(6)}`;
}

// lightweight image compression for photos
function compressImage(file, maxWidth = 1280, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) return resolve(file);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const ratio = img.width / img.height;
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        width = maxWidth;
        height = Math.round(maxWidth / ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        const newFile = new File([blob], file.name, { type: blob.type });
        URL.revokeObjectURL(url);
        resolve(newFile);
      }, 'image/jpeg', quality);
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
}

// submit handler
reportForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const fd = new FormData();
    fd.append('category', document.getElementById('category').value);
    fd.append('district', document.getElementById('district').value);
    fd.append('description', document.getElementById('description').value || '');
    fd.append('anonymous', anonymousCheckbox.checked ? 'true' : 'false');

    const contactVal = document.getElementById('contact')?.value || '';
    if (contactVal) fd.append('contact', contactVal);

    const file = mediaInput.files[0];
    if (file) {
      const image = await compressImage(file);
      fd.append('media', image);
    }

    if (coords) {
      fd.append('latitude', coords.lat);
      fd.append('longitude', coords.lng);
    }

    const addressVal = document.getElementById('address').value || '';
    if (addressVal) fd.append('address', addressVal);

    // send to backend
    const res = await fetch(API_ENDPOINT, { method: 'POST', body: fd });

    const text = await res.text();
    console.log('Raw server response:', text);

    let json = null;
    try {
      json = JSON.parse(text.trim());
    } catch (err) {
      console.error('json parse error', err);
      alert('Server returned an unexpected response');
      return;
    }

    if (json && json.id) {
      // show reference and result box
      refEl.textContent = json.id;
      resultBox.classList.remove('hidden');
      resultBox.scrollIntoView({ behaviour: 'smooth', block: 'center' });
      // do not reset the form here
      // do not hide the map here
    } else {
      alert('Unexpected server response');
    }

  } catch (err) {
    console.error('submit error', err);
    alert('An error occurred. Please try again');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Report';
  }
});

// close result box handler
closeResultBtn.addEventListener('click', () => {
  // hide result box
  resultBox.classList.add('hidden');

  // reset form now that user closed the box
  reportForm.reset();

  // clear coords and remove marker and hide mapContainer
  coords = null;
  if (marker && map) {
    map.removeLayer(marker);
    marker = null;
  }
  if (map) {
    map.remove(); // remove map instance to avoid stale render
    map = null;
  }
  mapContainer.classList.add('hidden');
  mapContainer.setAttribute('aria-hidden', 'true');

  // clear reference display
  refEl.textContent = '';

  // ensure contact wrapper state matches anonymous checkbox default
  contactWrapper.classList.toggle('hidden', anonymousCheckbox.checked);
});

// check status button
checkStatusBtn.addEventListener('click', async () => {
  const id = ticketInput.value.trim();
  if (!id) {
    alert('Enter a ticket reference');
    return;
  }

  statusResult.textContent = 'Checking...';

  try {
    const res = await fetch(`${STATUS_ENDPOINT}/${id}/status`);
    if (!res.ok) {
      statusResult.textContent = 'Ticket not found';
      return;
    }
    const json = await res.json();
    statusResult.textContent = `Status: ${json.status}`;
  } catch (err) {
    console.error('status fetch error', err);
    statusResult.textContent = 'Error fetching status';
  }
});
