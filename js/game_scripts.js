/*
 let circle = document.querySelector('.circle');
 let moveBy = 20;
 window.addEventListener('load', () => {
 circle.style.position = 'absolute';
 circle.style.left = 0;
 circle.style.top = 0;
 });
 window.addEventListener('keyup', (e) => {
 switch (e.key) {
 case 'ArrowLeft':
 circle.style.left = parseInt(circle.style.left) - moveBy + 'px';
 break;
 case 'ArrowRight':
 circle.style.left = parseInt(circle.style.left) + moveBy + 'px';
 break;
 case 'ArrowUp':
 circle.style.top = parseInt(circle.style.top) - moveBy + 'px';
 break;
 case 'ArrowDown':
 circle.style.top = parseInt(circle.style.top) + moveBy + 'px';
 break;
 }
 });*/


const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard)
        return;
    if (this === firstCard)
        return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//cards.forEach(card => card.addEventListener('click', flipCard));
var x_axis = 0,
        y_axis = 0;
//var x_axis = 630,
        //y_axis = 600;

document.onkeydown = check_key;

function check_key(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        move_car("up");
    } else if (e.keyCode == '40') {
        move_car("down");
    } else if (e.keyCode == '37') {
        move_car("left");
    } else if (e.keyCode == '39') {
        move_car("right");
    }
}

function move_car(a) {
    if (a == 'right') {
        x_axis = x_axis + 10;
        $(".car").css({"transform": "translate(" + x_axis + "px," + y_axis + "px)  rotate(0deg)"});
    } else if (a == 'left') {
        x_axis = x_axis - 10;
        $(".car").css({"transform": "translate(" + x_axis + "px," + y_axis + "px) rotate(180deg)"});
    } else if (a == 'up') {
        y_axis = y_axis - 10;
        $(".car").css({"transform": "translate(" + x_axis + "px," + y_axis + "px)rotate(270deg)"});
    } else if (a == 'down') {
        y_axis = y_axis + 10;
        $(".car").css({"transform": "translate(" + x_axis + "px," + y_axis + "px) rotate(90deg)"});
    }
}