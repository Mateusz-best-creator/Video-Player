const mainElement = document.querySelector('.player');
const videoElement = document.querySelector('video');
const playButton = document.getElementById('play-btn');
const fullscreenButton = document.querySelector('.fa-expand');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speedOptions = document.querySelector('.player-speed');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.querySelector('#volume-icon');

function togglePlay() {
    if (videoElement.paused) {
        // Play
        videoElement.play();
        playButton.classList.replace('fa-play', 'fa-stop');
        playButton.setAttribute('title', 'Play');
        console.log(playButton);
    } else {
        videoElement.pause();
        playButton.classList.replace('fa-stop', 'fa-play');
        playButton.setAttribute('title', 'Stop');
    }
}

let lastVolume = 1;

// Toggle volume
function updateVolume(event) {
  volumeIcon.classList = '';
  let percentage = event.offsetX / volumeRange.offsetWidth * 100;
  // Change Icon 
  if (percentage < 10) {
    percentage = 0
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  } else if (percentage > 90) {
    percentage = 100;
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else {
    volumeIcon.classList.add('fas', 'fa-volume-down')
  }
  videoElement.volume = percentage / 100;
  volumeBar.style.width = `${percentage}%`;

  lastVolume = percentage / 100;
}

function toggleVolume() {
  volumeIcon.className = '';
    if (videoElement.volume) {
        lastVolume = videoElement.volume;
        videoElement.volume = 0;
        volumeBar.style.width = '0%';
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        videoElement.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (videoElement.volume < 0.7 && videoElement.volume >= 0.1) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else if (videoElement.volume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else {
            volumeIcon.classList.add('fas', 'fa-volume-mute');
        }
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Update progressBar
function updateProgressBar(event) {
  progressBar.style.width = `${event.srcElement.currentTime / event.srcElement.duration * 100}%`;
  // Update counter
  const minutes = Math.floor(event.srcElement.currentTime / 60);
  let seconds = Math.floor(event.srcElement.currentTime % 60); 
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const durationMinutes = Math.floor(videoElement.duration / 60);
  let durationSeconds = Math.floor(videoElement.duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // Set our values
  currentTime.textContent = `${minutes}:${seconds} / `;
  duration.textContent = `${durationMinutes}:${durationSeconds}`;
}

function updateProgressBarClick(event) {
  const time = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${time * 100}%`;
  // Update video currenttime
  videoElement.currentTime = `${time * videoElement.duration}`;
}

// Toggle Speed
function toggleSpeed() {
  videoElement.playbackRate = speedOptions.value;
}

// Toggle fullscreen

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    // Add css class for fullscreen
    videoElement.classList.add('video-fullscreen');
}
  
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    videoElement.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    fullscreen ? closeFullscreen() : openFullscreen(mainElement);
    fullscreen = !fullscreen;
}


playButton.addEventListener('click', togglePlay);
videoElement.addEventListener('click', togglePlay);
// If video ended
videoElement.addEventListener('ended', () => {
    playButton.classList.replace('fa-stop', 'fa-play');
    playButton.setAttribute('title', 'Play');
})
// Toggle fullscreen
fullscreenButton.addEventListener('click', toggleFullscreen);
// Progress Bar
videoElement.addEventListener('timeupdate', updateProgressBar);
progressRange.addEventListener('click', updateProgressBarClick);
speedOptions.addEventListener('change', toggleSpeed);
volumeRange.addEventListener('click', updateVolume);
volumeIcon.addEventListener('click', toggleVolume);