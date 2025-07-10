// https://www.youtube.com/watch?v=q__yopYUW80&t=438s
// console.log("Consolelog message");
const songname = document.getElementById("song-name"); //id para a teg que mostra o nome da música
const song = document.getElementById("audio"); // id da tag de audio que aponta para o arquivo mp3
const play = document.getElementById("play") // id aplicado ao botão de play

songname.innerText = "The Pretender";
let isPlaying = false;
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

play.addEventListener("click", playPauseDecider);