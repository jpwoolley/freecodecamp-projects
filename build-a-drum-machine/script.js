const drumPads = document.getElementsByClassName("drum-pad");
const drumDisplay = document.getElementById("display");
const padObject = [
    {
        padLetter: 'Q',
        name: 'Heater-1'
    },
    {
        padLetter: 'W',
        name: 'Heater-2'
    },
    {
        padLetter: 'E',
        name: 'Heater-3'
    },
    {
        padLetter: 'A',
        name: 'Heater-4'
    },
    {
        padLetter: 'S',
        name: 'Clap'
    },
    {
        padLetter: 'D',
        name: 'Open-HH'
    },
    {
        padLetter: 'Z',
        name: "Kick-n'-Hat"
    },
    {
        padLetter: 'X',
        name: 'Kick'
    },
    {
        padLetter: 'C',
        name: 'Closed-HH'
    }
];

function updateDisplay(text){
    drumDisplay.innerText = text;
};

function playAudio(element){
    element.currentTime = 0;
    element.play();
};

function padAction(pad) {
    const padData = padObject.find(x => x.padLetter === pad);

    updateDisplay(padData.name)
    playAudio(document.getElementById(`pad-${padData.padLetter}`).firstChild);
    

}

for (let i = 0; i < drumPads.length; i++) {
    drumPads[i].addEventListener('click', (event) => padAction(event.target.innerText))
}

document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase();
    if(letter === 'Q' || 'W' || 'E' || 'A' || 'S' || 'D' || 'Z' || 'X' || 'C'){
        padAction(event.key.toUpperCase())
    }
})