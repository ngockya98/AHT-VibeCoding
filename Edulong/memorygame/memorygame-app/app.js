const pokemonCount = 8; // 4x4 grid
let pokemonImages = [];
const cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

async function fetchPokemonImages() {
    const promises = [];
    for (let i = 1; i <= pokemonCount; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => data.sprites.front_default));
    }
    pokemonImages = await Promise.all(promises);
    setupCards();
    createBoard();
}

function setupCards() {
    const images = [...pokemonImages, ...pokemonImages];
    images.forEach(img => cards.push(img));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    matches = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    const shuffled = shuffle(cards.slice());
    shuffled.forEach((img, idx) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.img = img;
        card.innerHTML = `<img src="${img}" style="width:60px;height:60px;visibility:hidden;">`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard(e) {
    if (lockBoard) return;
    const card = e.target.closest('.card');
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.querySelector('img').style.visibility = 'visible';
    if (!firstCard) {
        firstCard = card;
        return;
    }
    secondCard = card;
    lockBoard = true;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.img === secondCard.dataset.img) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches += 1;
        if (matches === pokemonCount) {
            document.getElementById('message').textContent = 'You win!';
        }
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.querySelector('img').style.visibility = 'hidden';
            secondCard.classList.remove('flipped');
            secondCard.querySelector('img').style.visibility = 'hidden';
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

fetchPokemonImages();
