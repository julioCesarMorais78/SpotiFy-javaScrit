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

const The_Pretender = {
    songName : "The Pretender",
    artist : "Foo Fighters",
    file : "The_Pretender"
}
const Blaze_of_Glory = {
    songName : "Blaze of Glory",
    artist : "Bon Jovi",
    file : "Blaze_of_Glory"
}
const Behind_Blue_Eyes = {
    songName : "Behind Blue Eyes",
    artist : "Limpbzkit",
    file : "Behind_Blue_Eyes"
}

const originalPlayList = [The_Pretender, Blaze_of_Glory, Behind_Blue_Eyes];
let sortedPlaylist = [...originalPlayList];

let index = 0;

// songname.innerText = "The Pretender";
let isPlaying = false;
let isShuffle = false;
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

function initializeSong () {
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songname.innerHTML = sortedPlaylist[index].songName;
    bandname.innerHTML = sortedPlaylist[index].artist;

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

function updateProgressBAr () {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);

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


play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBAr);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);