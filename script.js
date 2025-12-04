/* script.js
 Pure JavaScript front end for the EKEDC reporting form
 Captures coordinates, compresses images when possible, shows map preview, posts to backend.
*/

// Change this URL to your backend endpoint if different
const API_ENDPOINT = 'http://localhost:5000/api/report';

const useLocationBtn = document.getElementById('useLocation');
const mapContainer = document.getElementById('mapContainer');
const coordsEl = document.getElementById('coords');
const reportForm = document.getElementById('reportForm');
const mediaInput = document.getElementById('media');
const resultBox = document.getElementById('result');
const refEl = document.getElementById('ref');
const anonymousCheckbox = document.getElementById('anonymous');
const contactWrapper = document.getElementById('contactWrapper');

let coords = null;
let map = null;
let marker = null;

// show or hide contact field based on anonymous checkbox
anonymousCheckbox.addEventListener('change', () => {
  if (anonymousCheckbox.checked) {
    contactWrapper.classList.add('hidden');
  } else {
    contactWrapper.classList.remove('hidden');
  }
});

// try getting browser geolocation
useLocationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }
  useLocationBtn.disabled = true;
  useLocationBtn.textContent = 'Locating...';

  navigator.geolocation.getCurrentPosition((position) => {
    coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    showMapPreview(coords);
    useLocationBtn.textContent = 'Location captured';
    useLocationBtn.disabled = false;
  }, (err) => {
    console.error('Location error', err);
    alert('Unable to fetch location. You may enter address manually');
    useLocationBtn.textContent = 'Use my location';
    useLocationBtn.disabled = false;
  }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 });
});

// show small map preview using Leaflet
function showMapPreview(c) {
  mapContainer.classList.remove('hidden');
  if (!map) {
    map = L.map('map', { attributionControl: false, zoomControl: false }).setView([c.lat, c.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);
    marker = L.marker([c.lat, c.lng]).addTo(map);
  } else {
    map.setView([c.lat, c.lng], 16);
    marker.setLatLng([c.lat, c.lng]);
  }
  coordsEl.textContent = `Latitude: ${c.lat.toFixed(6)} Longitude: ${c.lng.toFixed(6)}`;
}

// light client side image compression for images only
function compressImage(file, maxWidth = 1280, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      // no compression for non images
      return resolve(file);
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = img.width / img.height;
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        width = maxWidth;
        height = Math.round(maxWidth / ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        // preserve original type where possible
        const newFile = new File([blob], file.name, { type: blob.type });
        URL.revokeObjectURL(url);
        resolve(newFile);
      }, 'image/jpeg', quality);
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
}

// handle form submit
reportForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const formData = new FormData();
    formData.append('category', document.getElementById('category').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('anonymous', document.getElementById('anonymous').checked ? 'true' : 'false');
    const contact = document.getElementById('contact') ? document.getElementById('contact').value : '';
    if (contact) formData.append('contact', contact);

    // handle media compression if image
    const file = mediaInput.files[0];
    if (file) {
      const processedFile = await compressImage(file);
      formData.append('media', processedFile);
    }

    if (coords) {
      formData.append('latitude', coords.lat);
      formData.append('longitude', coords.lng);
    }

   const address = document.getElementById('address').value;
if (address) formData.append('address', address);

formData.append('district', document.getElementById('district').value);

// post to backend
const res = await fetch(API_ENDPOINT, {
  method: 'POST',
  body: formData
});


    if (!res.ok) {
      const text = await res.text();
      console.error('Server error', text);
      alert('Submission failed. Please try again later');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Report';
      return;
    }

    const json = await res.json();
    if (json && json.id) {
      refEl.textContent = json.id;
      resultBox.classList.remove('hidden');
      // reset small parts of form
      document.getElementById('description').value = '';
      mediaInput.value = '';
      document.getElementById('address').value = '';
      coords = null;
      if (map) {
        mapContainer.classList.add('hidden');
      }
    } else {
      alert('Unexpected response from server');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred. Please try again');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Report';
  }
});
