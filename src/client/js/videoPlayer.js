const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;

video.volume = volumeValue;

const handlePlayClick = (event) => {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (event) => {
    if(video.muted) {
        video.muted = false;
    }
    else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const { 
        target: { 
            value 
        },
    } = event;
    //handleMute();
    volumeValue = value;
    video.volume = volumeValue;
};

const formatTime = (seconds) => 
    new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetaData = (event) => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (event) => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
    const {
        target: { 
            value 
        },
    } = event;
    video.currentTime = value;
};

const handleFullScreen = () => {
    // 화면에 fullscreen 상태가 있는 element가 있으면 결과가 나오고 없다면 null 표출
    const fullscreen = document.fullscreenElement;
    if(fullscreen) {
        document.exitFullscreen();
        fullScreenBtnIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtnIcon.classList = "fas fa-compress";
    }
};

const hideControls = () => videoControls.classList.remove("showing");


const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    // 3000ms(3초) 후 css 삭제
    controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    // POST 방식으로 전송
    fetch(`/api/video/${id}/view`, {
        method: "POST",
    });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
// 비디오 컨트롤러에서도 마우스 움직일 시 타이머 초기화 설정
videoControls.addEventListener("mousemove", handleMouseMove);
videoControls.addEventListener("mouseleave", handleMouseLeave);