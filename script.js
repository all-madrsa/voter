// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7x6epAwfshYNzc4G8JvmE4Bu3UNdMB5U",
  authDomain: "nikah-c234b.firebaseapp.com",
  databaseURL: "https://nikah-c234b-default-rtdb.firebaseio.com",
  projectId: "nikah-c234b",
  storageBucket: "nikah-c234b.appspot.com",
  messagingSenderId: "760906560668",
  appId: "1:760906560668:web:0a2c16a47aeaec26482959",
  measurementId: "G-ENL0FZPEEF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ----- Login Page -----
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
  loginBtn.addEventListener('click', () => {
    // Simple anonymous login for demo
    auth.signInAnonymously().then(() => {
      window.location.href = 'dashboard.html';
    }).catch(err => alert(err.message));
  });
}

// ----- Dashboard Page -----
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}

// ----- 4 Colorful Buttons -----
function openLink(button){
  const link = prompt("Enter URL for this button:");
  if(link) window.open(link, "_blank");
}

// ----- Cloudinary Upload -----
function openCloudinaryUpload(){
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if(!file) return;

    const cloudName = 'YOUR_CLOUD_NAME'; // Replace with your Cloud Name
    const unsignedUploadPreset = 'dlsqxs7zl';

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);

    fetch(url, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      if(data.secure_url){
        const imagesDiv = document.getElementById('images');
        const img = document.createElement('img');
        img.src = data.secure_url;
        imagesDiv.appendChild(img);
      } else {
        alert("Upload failed");
      }
    })
    .catch(err => alert(err));
  };
  fileInput.click();
}
