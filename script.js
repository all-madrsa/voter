const iframe = document.getElementById('browser');

function goBack() {
  iframe.contentWindow.history.back();
}

function goForward() {
  iframe.contentWindow.history.forward();
}

function goURL() {
  const url = document.getElementById('urlInput').value;
  if (!url.startsWith('http')) {
    iframe.src = 'https://' + url;
  } else {
    iframe.src = url;
  }
}

// Register service worker for offline / PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('SW registration failed:', err));
}
