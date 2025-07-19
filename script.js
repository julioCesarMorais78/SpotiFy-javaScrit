// https://www.youtube.com/watch?v=q__yopYUW80&t=438s
// console.log("Consolelog message");
const songname = document.getElementById("song-name"); //id para a teg que mostra o nome da música
const bandname = document.getElementById("band-name");  // busca o id da tag do nome da banda
const song = document.getElementById("audio"); // id da tag de audio que aponta para o arquivo mp3
const play = document.getElementById("play"); // id aplicado ao botão de play
const cover = document.getElementById("cover");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");
const likeButton = document.getElementById("like");


const The_Pretender = {
    songName : "The Pretender",
    artist : "Foo Fighters",
    file : "The_Pretender",
    liked: false
}
const Blaze_of_Glory = {
    songName : "Blaze of Glory",
    artist : "Bon Jovi",
    file : "Blaze_of_Glory",
    liked: false
}
const Behind_Blue_Eyes = {
    songName : "Behind Blue Eyes",
    artist : "Limpbzkit",
    file : "Behind_Blue_Eyes",
    liked: false
}

const originalPlayList = JSON.parse(localStorage.getItem("playlist")) ?? [The_Pretender, Blaze_of_Glory, Behind_Blue_Eyes];
let sortedPlaylist = [...originalPlayList];

let index = 0;

// songname.innerText = "The Pretender";
let isPlaying = false;
let isShuffle = false;
let repeatOn = false;
// song.pause();

function playSong() {
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    song.pause();
    isPlaying = false
}

function playPauseDecider() {
    if (isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function likeButtonRender () {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector(".bi").classList.remove("bi-heart");
        likeButton.querySelector(".bi").classList.add("bi-heart-fill");
        likeButton.classList.add("button-active");
    } else {
        likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
        likeButton.querySelector(".bi").classList.add("bi-heart");
        likeButton.classList.remove("button-active");
    }
}



function initializeSong () {
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songname.innerHTML = sortedPlaylist[index].songName;
    bandname.innerHTML = sortedPlaylist[index].artist;
    likeButtonRender()
}

initializeSong();

function previousSong () {
    if (index === 0){
        index = sortedPlaylist.length -1;
    }
    else{
    index = index - 1;
    }
    initializeSong();
    playSong();
}
function nextSong () {
    if (index === sortedPlaylist.length -1){
        index = 0;
    }
    else{
    index = index + 1;
    }
    initializeSong();
    playSong();
}

function updateProress () {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo (event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray (preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;

    }
}

function shuffleButtonClicked () {
    if (isShuffle === false) {
        isShuffle = true;
        shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
    }else {
        isShuffle = false;
        sortedPlaylist = [...originalPlayList];
    shuffleButton.classList.remove("button-active");
    }
}

function repeatButtonClicked () {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add("button-active");
    }else {
        repeatOn = false;
        repeatButton.classList.remove("button-active");
    }
}

function nextOrRepeat () {
    if (repeatOn === false) {
        nextSong();

    }else{
        playSong();
    }
}

// function updateCurentTime () {
//     songTime.innerText = toHHMMSS(song.currentTime);
// }

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let mins = Math.floor((originalNumber - (hours * 3600)) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - mins * 60);
    
    // Formata para sempre ter dois dígitos
    // let formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    // let formatted = `${hours}:${mins}:${secs}`;
    // alert(formatted);
}

function updateTotalTime () {
    toHHMMSS(song.duration);
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked () {
    if (sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem("playlist", JSON.stringify(originalPlayList));
}

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeButton.addEventListener("click", likeButtonClicked);