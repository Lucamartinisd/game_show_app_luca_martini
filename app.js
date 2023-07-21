const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const startGameButton = document.querySelector('.btn__reset');
const heartImgs = document.querySelectorAll('.tries img');

let missed = 0;

const phrases = [
    'THE CAPITAL OF CALIFORNIA IS SACRAMENTO',
    'BE HAPPY',
    'NEVER GIVE UP',
    'SMELL LIKE TEEN SPIRIT',
    'THIS ONE IS IMPOSSIBLE',
    'YOU MADE IT',
    'I HAVE NO IDEA WHAT I HAVE JUST WROTE',
    'THE GUITAR HAS SIX STRINGS',
    'FIESTA FOREVER',
    'MY PRECIOUS',
    'I AM BORED',
    'LEONARDO DI CAPRIO PLAYED THE ROLE OF JACK IN TITANIC',
    'TO RAIN CATS AND DOGS',
    'IF THE CAT IS AWAY THE MICE PLAY',
    'ALL BARK AND NO BITE',
    'ALL IN THE SAME BOAT',
    'EASY',
    'GET UP ON THE WRONG SIDE OF THE BED',
    'ARIEL IS A MERMAID'
];

startGameButton.style.cursor = 'pointer';

startGameButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    const randomNumb = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumb];
    const splitWords = randomPhrase.split('');
    return splitWords;
}

const randomPhraseToDisplay = getRandomPhraseAsArray(phrases);

//adds the letters of a string to the display
function addPhraseToDisplay(arr) {
    const phraseLi = document.querySelector('#phrase ul');
    phraseLi.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
      const char = arr[i];
      const li = document.createElement('li');
      li.textContent = char;

      if (char !== ' ') {
        li.classList.add('letter');
      } 

      else {
        li.classList.add('space');
      }

      phraseLi.appendChild(li);
    }
}

addPhraseToDisplay(randomPhraseToDisplay);

// check if a letter is in the phrase
function checkLetter(clickedButton) {
    const letterElements = document.querySelectorAll('.letter');
    let match = null;

    for (let i = 0; i < letterElements.length; i++) {
      const letterElement = letterElements[i];
      const letter = letterElement.textContent.toLowerCase();

        if (letter === clickedButton.textContent.toLowerCase()) {
            letterElement.classList.add('show');
            match = letter;
        }
    }

    return match;
}

//listen for the onscreen game button to be pressed
// replace the hearts if a chosen letter is incorrect 
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        clickedButton.classList.add('chosen');
        clickedButton.disabled = true;
        let letterFound = checkLetter(clickedButton);

        if (letterFound === null) {
            missed += 1;
            heartImgs[heartImgs.length - missed].src = 'images/lostHeart.png';
        } 
    }
    checkWin();
});

//listen for the start game button to be pressed
startGameButton.addEventListener('click', () => {
    resetGame();
    overlay.style.display = 'none';
});

// reset button function
function resetGame() {
    const phraseLi = document.querySelector('#phrase ul');
    phraseLi.innerHTML = '';
    const keys = keyboard.querySelectorAll('button');

    for (let i = 0; i < keys.length; i++) {
        const button = keys[i];
        button.classList.remove('chosen');
        button.disabled = false;
    }

    missed = 0;
    const tries = document.querySelectorAll('.tries');

    for (let i = 0; i < tries.length; i++) {
        const heartImage = tries[i].querySelector('img');
        heartImage.src = 'images/liveHeart.png';
    }

    const newRandomPhraseToDisplay = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newRandomPhraseToDisplay);
}

// check if the game has been won or lost
function checkWin() {
    const letterElements = document.querySelectorAll('.letter');
    const showElements = document.querySelectorAll('.show');

    if (letterElements.length === showElements.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = '🎉🥳Congratulations, you win!🥳🎉';
    }

    else if (missed >= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = '😭💔Wrong!! You lose try again!💔😭';
    }
}