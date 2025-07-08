// console.log("Consolelog message");
const songname = document.getElementById("song-name"); //id para a teg que mostra o nome da música
const song = document.getElementById("audio"); // id da tag de audio que aponta para o arquivo mp3
const play = document.getElementById("play") // id aplicado ao botão de play

songname.innerText = "The Pretender";
// song.pause();

function playSong() {
    // play.querySelector(".bi").;
    song.play();
}

play.addEventListener("click", playSong)