 // Mock staff database
 const staffDatabase = {
  "23023": {
    id: "23023",
    name: "Abdulkareem Halimat",
    department: "Customer Onboarding",
    email: "halimat.abdulkareem@ekedp.com",
    phone: "+234 706 871 1112",
    location: "HQ Marina"
  },
  "23039": {
    id: "23039",
    name: "Muhammed Malik",
    department: "Field Surveillance",
    email: "malik.muhammed@ekedp.com",
    phone: "+234 902 866 4231",
    location: "HQ Marina",
    photo: "./images/staff/23039.jpeg" // Optional - add when available

  },
  "23147": {
    id: "23147",
    name: "Edeobi Chidera Michael",
    department: "Commercial",
    email: "chidera.edeobi@ekedp.com",
    phone: "+234 707 684 5052",
    location: "HQ Marina"
  },
  "23138": {
    id: "23138",
    name: "Umoru Sabikat",
    department: "Field Surveillance",
    email: "sabikat.umoru@ekedp.com",
    phone: "+234 815 840 9130",
    location: "HQ Marina"
  },
  "23081": {
    id: "23081",
    name: "Oluyemi Israel",
    department: "Field Surveillance",
    email: "israel.oluyemi@ekedp.com",
    phone: "+234 903 827 2129",
    location: "HQ Marina"
  },
  "23084": {
    id: "23084",
    name: "Nwokoro Kenneth",
    department: "Field Surveillance",
    email: "kenneth.nwokoro@ekedp.com",
    phone: "+234 706 630 2115",
    location: "HQ Marina"
  },
  "23054": {
    id: "23054",
    name: "Adeniyi Iyanuoluwa",
    department: "GIS",
    email: "iyanuoluwa.adeniyi@ekedp.com",
    phone: "+234 807 258 7988",
    location: "HQ Marina"
  },
  "23117": {
    id: "23117",
    name: "Nnanna Samuel",
    department: "Field Surveillance",
    email: "samuel.nnanna@ekedp.com",
    phone: "+234 702 655 0451",
    location: "HQ Marina"
  },
  "23150": {
    id: "23150",
    name: "Nkankwo Chigozie Alice",
    department: "GIS",
    email: "chigozie.nnankwo@ekedp.com",
    phone: "+234 901 592 2187",
    location: "HQ Marina"
  },
  "30009": {
    id: "30009",
    name: "Okoli Chinenye",
    department: "Field Surveillance",
    email: "chinenye.okoli@ekedp.com",
    phone: "+234 810 373 7205",
    location: "HQ Marina"
  },
  "23066": {
    id: "23066",
    name: "Saheed Oluwatosin",
    department: "Network Planning",
    email: "oluwotosin.saheed@ekedp.com",
    phone: "+234 913 784 6980",
    location: "HQ Marina"
  },

  "23093": {
    id: "23093",
    name: "Femi Olasehinde",
    department: "PSC",
    email: "femi.olasehinde@ekedp.com",
    phone: "+234 806 980 3905",
    location: "Marina HQ",
    photo: "./images/staff/23093.jpeg" // Optional - add when available
  },
  "23123": {
    id: "23123",
    name: "Salau Mumeen",
    department: "Network Planning",
    email: "mumeen.salau@ekedp.com",
    phone: "+234 706 786 3765",
    location: "Marina HQ",
    photo: "./images/staff/23123.jpeg" // Optional - add when available
  },

  "23135": {
    id: "23135",
    name: "Oremegue Rosemond",
    department: "Projects",
    email: "rosemon.oremegue@ekedp.com",
    phone: "+234 916 437 6972",
    location: "Marina HQ"
  },
  "23057": {
    id: "23057",
    name: "Gbuyiro Timilehin Mayowa",
    department: "Protection and Testing",
    email: "timilehin.gbuyiro@ekedp.com",
    phone: "+234 814 566 0808",
    location: "Marina HQ"
  },
  "23096": {
    id: "23096",
    name: "Oluwawande Demilade",
    department: "SPRO",
    email: "demilade.oluwawande@ekedp.com",
    phone: "+234 704 217 6321",
    location: "Marina HQ",
    photo: "./images/staff/23096.jpeg" // Optional - add when available
  },
  "23108": {
    id: "23108",
    name: "Obika Chukwudi",
    department: "I and QA",
    email: "chukwudi.obika@ekedp.com",
    phone: "+234 813 900 7724",
    location: "Marina HQ"
  },
  "23141": {
    id: "23141",
    name: "Sikiru Ismail Oladimeji",
    department: "I and QA",
    email: "ismail.sikiru@ekedp.com",
    phone: "+234 814 657 8128",
    location: "Marina HQ"
  },
  "": {
    id: "23075",
    name: "Ajayi Marvellous",
    department: "E and S",
    email: "marvellous.ajayi@ekedp.com",
    phone: "+234 705 681 7721",
    location: "Marina HQ"
  },
  "23114": {
    id: "23114",
    name: "Udemgba Kaosisochukwu",
    department: "Network Planning",
    email: "kaosis.udemgba@ekedp.com",
    phone: "+234 815 551 1879",
    location: "Marina HQ"
  },
  "3005": {
    id: "3005",
    name: "Akinjole David",
    department: "Contract Management",
    email: "david.akinjole@ekedp.com",
    phone: "+234 813 285 8042",
    location: "Marina HQ"
  },
  "30021": {
    id: "30021",
    name: "Obada Chukwumeka",
    department: "Projects",
    email: "chukwumeka.obada@ekedp.com",
    phone: "+234 814 195 9925",
    location: "Marina HQ"
  },
  "23132": {
    id: "23132",
    name: "Hamzat Kareemat",
    department: "P and T",
    email: "kareemat.hamzat@ekdep.com",
    phone: "081 0127 0247",
    location: "Marina HQ"
  },
  "23156": {
    id: "23156",
    name: "Ogu Christiantus",
    department: "P and T",
    email: "christiantus.ogu@ekdep.com",
    phone: "+234 806 417 6458",
    location: "Ijora District"
  },
  "23051": {
    id: "23051",
    name: "Asake Akinlolu",
    department: "P and T",
    email: "akinlolu.asake@ekedp.com",
    phone: "+234 703 0093 6785",
    location: "Ijora 33kV"
  },
  "23060": {
    id: "23060",
    name: "David Ikechukwu Oputa",
    department: "P and T",
    email: "ikechukwu.david@ekedp.com",
    phone: "+234 811 951 3239",
    location: "Ijora 33kV"
  },
  "23069": {
    id: "23069",
    name: "Wahab Lateef",
    department: "P and T",
    email: "lateef.wahab@ekedp.com",
    phone: "+234 810 807 2153",
    location: "Ijora 33kV",
    photo: "./images/staff/23069.jpeg" // Optional - add when available
  },
  "23090": {
    id: "23090",
    name: "Eyeruroma Elijah",
    department: "P and T",
    email: "elijah.eyeruroma@ekedp.com",
    phone: "+234 814 077 2601",
    location: "Marina HQ"
  },
  "23126": {
    id: "23126",
    name: "Oyebanjo Joshua",
    department: "PSC",
    email: "joshua.oyebanjo@ekedp.com",
    phone: "+234 909 198 7785",
    location: "Marina HQ"
  },

   "23072": {
    id: "23072",
    name: "Ogunlade Dorcas",
    department: "Network Planning",
    email: "dorcas.ogunlade@ekedp.com",
    phone: "+234 813 258 6421",
    location: "Marina HQ",
    photo: "./images/staff/23072.jpeg" // Optional - add when available
  }
};


    // DOM Elements
    const avatarPhoto = document.getElementById('avatarPhoto');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const errorText = document.getElementById('errorText');
    const hintText = document.getElementById('hintText');
    const tryExample = document.getElementById('tryExample');
    const resultCard = document.getElementById('resultCard');

    // Modal elements
    const photoModal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const avatar = document.querySelector('.avatar');

    // Open modal when clicking avatar with photo
    avatar.addEventListener('click', () => {
      const photo = document.getElementById('avatarPhoto');
      if (photo && !photo.classList.contains('hidden')) {
        modalPhoto.src = photo.src;
        photoModal.classList.remove('hidden');
      }
    });

    // Close modal
    modalClose.addEventListener('click', () => photoModal.classList.add('hidden'));
    modalOverlay.addEventListener('click', () => photoModal.classList.add('hidden'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') photoModal.classList.add('hidden');
    });



    // Result elements
    const avatarInitials = document.getElementById('avatarInitials');
    const staffName = document.getElementById('staffName');
    // const staffPosition = document.getElementById('staffPosition');
    const staffId = document.getElementById('staffId');
    const staffDepartment = document.getElementById('staffDepartment');
    const staffEmail = document.getElementById('staffEmail');
    const staffPhone = document.getElementById('staffPhone');
    const staffLocation = document.getElementById('staffLocation');

    // Utility functions
    function showError(message) {
      errorText.textContent = message;
      errorText.classList.remove('hidden');
    }

    function hideError() {
      errorText.classList.add('hidden');
    }

    function getInitials(name) {
      return name.split(' ').map(n => n[0]).join('');
    }

    function displayResult(staff) {
      if (staff.photo) {
        avatarPhoto.src = staff.photo;
        avatarPhoto.classList.remove('hidden');
        avatarInitials.classList.add('hidden');
      } else {
        avatarPhoto.classList.add('hidden');
        avatarInitials.textContent = getInitials(staff.name);
        avatarInitials.classList.remove('hidden');
      }
      
      staffName.textContent = staff.name;
      staffId.textContent = staff.id;
      staffDepartment.textContent = staff.department;
      staffEmail.textContent = staff.email;
      staffPhone.textContent = staff.phone;
      staffLocation.textContent = staff.location;
      
      resultCard.classList.remove('hidden');
      hintText.classList.add('hidden');

      avatar.classList.toggle('clickable', !!staff.photo);

    }
    function hideResult() {
      resultCard.classList.add('hidden');
    }

    // Search function
    function search() {
      const id = searchInput.value.trim();
      
      hideError();
      hideResult();
      
      if (!id) {
        showError('Please enter a staff ID');
        return;
      }
      
      if (!/^\d{5}$/.test(id)) {
        showError('Staff ID must be exactly 5 digits');
        return;
      }

      searchBtn.disabled = true;
      searchBtn.textContent = '...';

      // Simulate API call
      setTimeout(() => {
        const result = staffDatabase[id];
        
        if (result) {
          displayResult(result);
        } else {
          showError('No staff member found with this ID');
          hintText.classList.remove('hidden');
        }
        
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
      }, 500);
    }

    // Event listeners
    searchBtn.addEventListener('click', search);

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        search();
      }
    });

    tryExample.addEventListener('click', () => {
      searchInput.value = '23567';
      hideError();
      hideResult();
      hintText.classList.remove('hidden');
    });



    // Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});