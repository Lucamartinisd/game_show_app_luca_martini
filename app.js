const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const startGameButton = document.querySelector('.btn__reset');
const letterButtons = document.querySelectorAll('#qwerty button');
const qwerty = document.querySelector('#qwerty');
const heartImg = document.querySelectorAll('.tries img');


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
    if (startGameButton.textContent === 'Play again') {
        reset();
    }
})

function getRandomPhraseAsArray (arr) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    localStorage.setItem('recentPhrase', phrase);
    let phraseSplitByWords = phrase.split(' ');
    return phraseSplitByWords;
}

let phraseToDisplay = getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr) {
        for (let i = 0; i < arr.length; i++) {
            let div = document.createElement('div');
            div.classList.add('word-space');
            let characters = arr[i].split('');
            for (let i = 0; i < characters.length; i++) {
                let li = document.createElement('li');
                li.textContent = `${characters[i]}`;
                let ul = document.querySelector('#phrase ul');
                ul.appendChild(div);
                div.appendChild(li);
                if (li.textContent !== ' ') {
                    li.classList.add('letter');
                }
            }
        }
}

addPhraseToDisplay(phraseToDisplay);



function checkLetter (clickedButton) {
    lettersInPhrase = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < lettersInPhrase.length; i++) {
        if (clickedButton.textContent.toUpperCase() === lettersInPhrase[i].textContent) {
            lettersInPhrase[i].classList.add('show');
            match = clickedButton.textContent;
        }
    }
    return match;
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        clickedButton.disabled = true;
        clickedButton.classList.add('chosen');
        let letterChecked = checkLetter(clickedButton); 
        if (letterChecked === null) {
            missed += 1;
            heartImg[heartImg.length - missed].src = 'images/lostHeart.png';
        } 
    }
    checkWin();
});

function checkWin () {
    letterStore = document.querySelectorAll('.letter');
    showStore = document.querySelectorAll('.show');
    if (letterStore.length === showStore.length) {
        for (let i = 0; i < showStore.length; i++) {
            showStore[i].classList.remove('show');
        }
        overlay.classList.add('win');
        title.textContent = "I can't Believe it!! You Won!!!";
        overlay.style.display = 'flex';
        startGameButton.textContent = 'Play again';
       
    }
    if (missed > 4) {
        for (let i =0; i < showStore.length; i++) {
            showStore[i].classList.remove('show');
        }
        overlay.classList.remove('start');
        overlay.classList.add('lose');
        title.textContent = 'HA HA!! LOOSER!!!!!';
        overlay.style.display = 'flex';
        startGameButton.textContent = 'Play again';
       
    }
}

function reset() {
    missed = 0;
    const ul = document.querySelector('#phrase ul');
    const wordSpace = document.querySelectorAll('.word-space');
    const hearts = document.querySelector('ol');
    overlay.classList.remove('win');
    overlay.classList.remove('lose');
    for (let i = 0; i < wordSpace.length; i++) {
        ul.removeChild(wordSpace[i]);
    }
    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false;
        letterButtons[i].classList.remove('chosen');
    }
    for (let i = 0; i < 5; i++) {
        heartImg[i].src = 'images/liveHeart.png';
    }
    let newPhraseToDisplay = getRandomPhraseAsArray(phrases);
    if (localStorage.getItem('phrase') !== newPhraseToDisplay) {
        getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhraseToDisplay);
    } else {
        localStorage.removeItem('phrase');
        localStorage.setItem('newPhraseToDisplay');
        newPhraseToDisplay = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseToDisplay);
    }
}        