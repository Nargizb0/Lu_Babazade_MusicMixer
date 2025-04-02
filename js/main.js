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
let currentAudios = [];
let pausedAudios = [];  // Stores paused audio elements

//Functional variables
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

    // Check if the drop zone already contains a child element
    if (this.childElementCount === 0) { // If the drop zone is empty
        this.appendChild(draggedPiece); // Append the dragged element to the drop zone
        // Special audio effect method 'play'
        playAudio(draggedPiece.id, this);
    } else {
        console.log('This drop zone already contains an element!');
        // Optionally, you can alert or provide feedback to the user that the drop zone is full
    }
}

function playAudio(selectedInstrument, selectedDropZone) {
    console.log(`Playing: ${selectedInstrument}`);

    let instrument = document.createElement('audio');
    instrument.src = `audio/${selectedInstrument}.mp3`;
    instrument.load();
    instrument.loop = true;
    instrument.play();

    // Set the initial volume for the audio when it's played
    instrument.volume = volumeSlider.value / 100; // Set the volume based on the slider

    // Save the audio instance in the currentAudios object
    currentAudios.push(instrument);
}

function pauseAudio() {
    console.log('Pausing all audio');

    // Pause all audio instances in the currentAudios array
    currentAudios.forEach(audio => {
        audio.pause();
        // Add the paused audio to the pausedAudios array
        pausedAudios.push(audio);
    });
    console.log('All audio paused');
}

function resumeAudio() {
    console.log('Resuming all audio');

    // Resume all paused audio instances
    pausedAudios.forEach(audio => {
        audio.play();
    });
    // Clear pausedAudios array after resuming
    pausedAudios = [];
    console.log('All audio resumed');
}

//event listeners
//musical fruits
lemonAudio.addEventListener('dragstart', startedDragging);
orangeAudio.addEventListener('dragstart', startedDragging);
watermelonAudio.addEventListener('dragstart', startedDragging);
pearAudio.addEventListener('dragstart', startedDragging);
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
    // Trigger a page refresh to reset everything
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
    // Convert the slider value to a decimal between 0 and 1
    let volume = volumeSlider.value / 100;
    
    // Set the volume of all currently playing audio elements based on the slider's value
    currentAudios.forEach(audio => {
        audio.volume = volume;
    });
});