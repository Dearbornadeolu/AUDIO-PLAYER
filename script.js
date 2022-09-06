const musicContainer =document.querySelector('.music-container')
const playBtn =document.querySelector('#play')
const prevBtn =document.querySelector('#prev')
const nextBtn =document.querySelector('#next')
const audio =document.querySelector('#audio')
const progress =document.querySelector('.progress')
const progressContainer =document.querySelector('.progress-container')
const title =document.querySelector('#title')
const cover =document.querySelector('#cover')

//song titles
const songs = [
    'medicine',
    'romantic',
    'wishlist'
]

//keeping track of the song

let songIndex = 2

//initially load a song 
loadSong(songs[songIndex])
function playSong(){
    musicContainer.classList.add('play')
    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    audio.pause()
}
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])

    playSong()
}
function updateProgress(e) {
    const {duration, currentTime } =e.srcElement
    const progressPercent = (currentTime / duration)* 100
    progress.style.width = `${progressPercent}%`
}
//update the song details

function loadSong(song){
    title.innerText = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/${song}.jpg`
}
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX/width)* duration
}
// event listener
playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying ) {
        pauseSong()
    } else {
        playSong()
    }
})
//change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)