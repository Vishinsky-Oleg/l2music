const myAudio = document.querySelector('.myAudio');
myAudio.addEventListener("timeupdate", setTime);


const playBtn = document.querySelector('.buttons-play');
const stopBtn = document.querySelector('.buttons-stop');
const downloadBtn = document.querySelector('.buttons-download');
const muteBtn = document.querySelector('.buttons-mute');
const timeline = document.querySelector('.timeline');
const timelineTime = document.querySelector('.timeline-time');
const timelineTimeFull = document.querySelector('.timeline-time-right');
const timelineLine = document.querySelector('.timeline-line');
const songSelect = document.querySelector("#songs");
const player = document.querySelector(".container");
const songTitle = document.querySelector(".songName");

playBtn.addEventListener('click', () => {
    if (myAudio.paused) {
        playBtn.children[0].setAttribute("name", "pause-outline");
        myAudio.play();
    } else {
        playBtn.children[0].setAttribute("name", "play-outline");
        myAudio.pause();
    }
})

stopBtn.addEventListener('click', () => {
    myAudio.currentTime = 0;
    myAudio.pause();
    playBtn.children[0].setAttribute("name", "play-outline");
    player.classList.remove('open');
})

function setTime() {
    let hours = Math.floor(myAudio.currentTime / 3600);
    let minutes = Math.floor(myAudio.currentTime / 60 - hours * 60);
    let seconds = Math.floor((myAudio.currentTime % 3600) - minutes * 60);
    let hoursValue;
    let minuteValue;
    let secondValue;

    if (hours < 10) {
        hoursValue = "0" + hours;
    } else {
        hoursValue = hours;
    }

    // if (minutes < 10) {
    //     minuteValue = "0" + minutes;
    // } else {
    //     minuteValue = minutes;
    // }
    minuteValue = minutes;

    if (seconds < 10) {
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    // let mediaTime = hoursValue + ":" + minuteValue + ":" + secondValue;
    let mediaTime = minuteValue + ":" + secondValue;
    timelineTime.textContent = mediaTime;
    if (timelineTimeFull.textContent = (Math.floor(myAudio.duration) / 60).toFixed(2) > 0) {
        timelineTimeFull.textContent = (Math.floor(myAudio.duration) / 60).toFixed(2);
    } else {
        timelineTimeFull.textContent = '';
    }


    let barLength =
        timeline.clientWidth * (myAudio.currentTime / myAudio.duration);

    timelineLine.style.width = barLength + "px";
}

timeline.addEventListener("mouseover", function (e) {
    timeline.style.cursor = "pointer";
});
// click on timeline
timeline.onclick = function (e) {
    let rect = timeline.getBoundingClientRect();
    // ab is position of mouse click relative to rect
    let ab = Math.ceil(e.x - rect.left) < 1 ? 1 : Math.ceil(e.x - rect.left);
    // percentage to multiply the time
    let perc = ab / timeline.offsetWidth;
    myAudio.currentTime = myAudio.duration * perc;
};

let level;
muteBtn.addEventListener('click', function () {
    if (myAudio.volume === 0) {
        myAudio.volume = level;
    } else {
        level = myAudio.volume;
        myAudio.volume = 0;
    }


})

const volBar = document.querySelector('#volume-bar');
volBar.addEventListener('input', function () {
    myAudio.volume = volBar.value;
});



myAudio.addEventListener('volumechange', () => {
    volBar.value = myAudio.volume;
})


songSelect.selectedIndex = -1;
songSelect.addEventListener('change', () => {
    if (!player.classList.contains('open')) {
        player.classList.add('open');
    }
    let selectedOption = songSelect.options[songSelect.selectedIndex];
    songTitle.textContent = selectedOption.textContent;
    let path = './dist/music/' + songSelect.value + ".mp3";
    fetch(path)
        .then(response => response.blob())
        .then(function (myBlob) {
            let objectURL = URL.createObjectURL(myBlob);
            myAudio.src = objectURL;
        });

    if (!myAudio.paused) {
        playBtn.children[0].setAttribute("name", "play-outline");
        myAudio.currentTime = 0;
        myAudio.play();
    }
    downloadBtn.setAttribute('download', songSelect.value);
    downloadBtn.setAttribute('href', path);
    timelineTimeFull.textContent = '';



})