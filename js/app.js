// Get DOM element references
const video = document.getElementById('universe-video');
const playPauseBtn = document.getElementById('playPauseBtn');
const loopBtn = document.getElementById('loopBtn');
const toggleOrientationBtn = document.getElementById('toggleOrientation');
const universeButtons = document.querySelectorAll('.universe-btn');
const appContainer = document.getElementById('app-container');

let controlsTimeout;
let isPortrait = true;  // Default mode is portrait

// Toggle video play/pause state
function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    video.pause();
    playPauseBtn.textContent = '►';
  }
}

// Toggle loop mode for video
function toggleLoop() {
  video.loop = !video.loop;
  loopBtn.style.background = video.loop ? 'rgba(0,150,0,0.8)' : 'rgba(0, 0, 0, 0.7)';
}

// Change the universe (video source)
function changeUniverse(event) {
  const newSrc = event.target.getAttribute('data-video');
  video.pause();
  video.setAttribute('src', newSrc);
  video.load();
  video.play();
  playPauseBtn.textContent = '❚❚';
}

// Toggle orientation between portrait and landscape
function toggleOrientation() {
  isPortrait = !isPortrait;
  if (isPortrait) {
    appContainer.classList.remove('landscape');
    toggleOrientationBtn.textContent = 'Portrait';
  } else {
    appContainer.classList.add('landscape');
    toggleOrientationBtn.textContent = 'Landscape';
  }
}

// Auto-hide controls after user inactivity (3 seconds)
function resetControlsTimer() {
  clearTimeout(controlsTimeout);
  appContainer.classList.add('show-controls');
  controlsTimeout = setTimeout(() => {
    appContainer.classList.remove('show-controls');
  }, 3000);
}

// Attach event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
loopBtn.addEventListener('click', toggleLoop);
toggleOrientationBtn.addEventListener('click', toggleOrientation);
universeButtons.forEach(btn => btn.addEventListener('click', changeUniverse));
document.addEventListener('mousemove', resetControlsTimer);
document.addEventListener('touchstart', resetControlsTimer);

// Attempt auto-play on load; update play button accordingly
window.addEventListener('load', () => {
  video.play().then(() => {
    playPauseBtn.textContent = '❚❚';
  }).catch(() => {
    playPauseBtn.textContent = '►';
  });
  resetControlsTimer();
});
