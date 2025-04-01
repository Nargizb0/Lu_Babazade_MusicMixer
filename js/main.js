// JavaScript

//Element Variables
const lemonAudio = document.querySelector('#lemonAudio'),
    orangeAudio = document.querySelector('#orangeAudio'),
    watermelonAudio = document.querySelector('#watermelonAudio'),
    pearAudio = document.querySelector('#pearAudio'),
    dropZone1 = document.querySelector('#dropZone1'),
    dropZone2 = document.querySelector('#dropZone2'),
    dropZone3 = document.querySelector('#dropZone3'),
    dropZone4 = document.querySelector('#dropZone4');

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
        instrument.src = `audio/${selectedInstrument}.mp3`;
        instrument.load();
        selectedDropZone.appendChild(instrument);
        instrument.loop = true;
        instrument.play();
}


//event listeners
lemonAudio.addEventListener('dragstart', startedDragging);
orangeAudio.addEventListener('dragstart', startedDragging);
watermelonAudio.addEventListener('dragstart', startedDragging);
pearAudio.addEventListener('dragstart', startedDragging);

dropZone1.addEventListener('dragover', draggedOver);
dropZone1.addEventListener('drop', dropped);
dropZone2.addEventListener('dragover', draggedOver);
dropZone2.addEventListener('drop', dropped);
dropZone3.addEventListener('dragover', draggedOver);
dropZone3.addEventListener('drop', dropped);
dropZone4.addEventListener('dragover', draggedOver);
dropZone4.addEventListener('drop', dropped);