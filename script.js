console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            gameover.play();

            // Disable click event on boxes
            let boxes = document.getElementsByClassName("box");
            Array.from(boxes).forEach(element => {
                element.removeEventListener('click', boxClick);
            });
        }
    });
};

// Function to handle box click
const boxClick = (event) => {
    let box = event.currentTarget;
    let boxtext = box.querySelector('.boxtext');
    if (boxtext.innerText === '' && !isgameover) {
        boxtext.innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        if (!isgameover) {
            document.querySelector(".info").innerText = "Turn for " + turn;
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', boxClick);
});

// Add onclick listener to reset button
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width = "0px";

    // Re-enable click event on boxes
    Array.from(boxes).forEach(element => {
        element.addEventListener('click', boxClick);
    });

    document.querySelector(".info").innerText = "Turn for " + turn;
});





