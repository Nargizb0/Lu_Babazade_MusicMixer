// JavaScript

//Element Variables
const musicFruits = document.querySelector('.musicFruit'),
    dropZone = document.querySelector('.dropZone');
let draggedPiece;

//Functional variables
const playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    rewindButton = document.querySelector('#rewindButton'),
    volSlider = document.querySelector('#volumeControl');


//handler for dragStart event
function startedDragging() {
    console.log('dragstart called');
    draggedPiece = this;
}

//handler for dragover event
function draggedOver(e) {
    console.log('dragover called');
    e.preventDefault();
}

//handler for drop event
function dropped(e) {
    console.log('drop called');
    e.preventDefault(e);
    this.appendChild(draggedPiece);

    //special audio effect method 'play'
    playAudio(draggedPiece.id, this);
}

//handler to play audio
function playAudio(selectedInstrument, selectedDropZone) {
    console.log(selectedInstrument);
    let instrument = document.createElement('audio');
        instrument.src = `audio/${selectedInstrument}.wav`;
        instrument.load();
        selectedDropZone.appendChild(instrument);
        instrument.loop = true;
        instrument.play();
}


//event listeners
musicFruits.addEventListener('dragstart', startedDragging);
dropZone.addEventListener('dragover', draggedOver);
dropZone.addEventListener('drop', dropped);