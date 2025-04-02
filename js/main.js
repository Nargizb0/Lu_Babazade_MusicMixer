//musical variables
const lemonAudio = document.querySelector('#lemonAudio'),
    orangeAudio = document.querySelector('#orangeAudio'),
    watermelonAudio = document.querySelector('#watermelonAudio'),
    pearAudio = document.querySelector('#pearAudio'),
    icon1 = document.querySelector('#icon1'),
    icon2 = document.querySelector('#icon2'),
    icon3 = document.querySelector('#icon3'),
    icon4 = document.querySelector('#icon4'),
    dropZone1 = document.querySelector('#dropZone1'),
    dropZone2 = document.querySelector('#dropZone2'),
    dropZone3 = document.querySelector('#dropZone3'),
    dropZone4 = document.querySelector('#dropZone4');

let draggedPiece;
let currentAudios = [];
let pausedAudios = [];

//functional variables
const rewindButton = document.querySelector('#reset-btn');
const pauseButton = document.querySelector('#pause-btn');
const resumeButton = document.querySelector('#resume-btn');
const volumeSlider = document.querySelector('#volumeControl');

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

    if (this.childElementCount === 0) {
        this.appendChild(draggedPiece);
        playAudio(draggedPiece.id, this);
    } else {
        console.log('This drop zone already contains an element!');
    }
}

//handler for playing the dropped audio
function playAudio(selectedInstrument, selectedDropZone) {
    console.log(`Playing: ${selectedInstrument}`);
    let audioId = draggedPiece.getAttribute('data-audio');
    
    let instrument = document.getElementById(audioId);
    
    if (instrument) {
        instrument.loop = true;
        instrument.play();
        instrument.volume = volumeSlider.value / 100;
        currentAudios.push(instrument);
    } else {
        console.log("Audio element not found for:", audioId);
    }
}

//handler for pausing the dropped audio
function pauseAudio() {
    console.log('Pausing all audio');
    currentAudios.forEach(audio => {
        audio.pause();
        pausedAudios.push(audio);
    });
    console.log('All audio paused');
}

//handler for resuming the paused audio
function resumeAudio() {
    console.log('Resuming all audio');
    pausedAudios.forEach(audio => {
        audio.play();
    });
    pausedAudios = [];
    console.log('All audio resumed');
}

//event listeners
//musical fruits
lemonAudio.addEventListener('dragstart', startedDragging);
orangeAudio.addEventListener('dragstart', startedDragging);
watermelonAudio.addEventListener('dragstart', startedDragging);
pearAudio.addEventListener('dragstart', startedDragging);
icon1.addEventListener('dragstart', startedDragging);
icon2.addEventListener('dragstart', startedDragging);
icon3.addEventListener('dragstart', startedDragging);
icon4.addEventListener('dragstart', startedDragging);
//dropzones
dropZone1.addEventListener('dragover', draggedOver);
dropZone1.addEventListener('drop', dropped);
dropZone2.addEventListener('dragover', draggedOver);
dropZone2.addEventListener('drop', dropped);
dropZone3.addEventListener('dragover', draggedOver);
dropZone3.addEventListener('drop', dropped);
dropZone4.addEventListener('dragover', draggedOver);
dropZone4.addEventListener('drop', dropped);
//audio adjustments
rewindButton.addEventListener('click', () => {
    window.location.reload();
});
pauseButton.addEventListener('click', () => {
    console.log('Pause button clicked');
    pauseAudio();
});
resumeButton.addEventListener('click', () => {
    console.log('Resume button clicked');
    resumeAudio();
});
volumeSlider.addEventListener('input', () => {
    let volume = volumeSlider.value / 100;
    currentAudios.forEach(audio => {
        audio.volume = volume;
    });
});