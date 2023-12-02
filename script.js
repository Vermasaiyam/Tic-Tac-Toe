let boxes = document.querySelectorAll(".box");
let turn = 'X';
let gameOver = false;
let ting = new Audio("./ting.mp3");
let win = new Audio("./win.mp3");
let success = new Audio("./success.mp3");
let gamemusic = new Audio("./gamemusic.mp3");


window.onload = ()=>{
    gamemusic.play();
}

function changeTurn(){
    return turn === 'X' ? 'O' : 'X';
}

function checkWin(){
    let boxTexts = document.getElementsByClassName('boxText');
    let wins = [
        [0,1,2, 41.25,82.5,0],
        [3,4,5, 41.5,247.5,0],
        [6,7,8, 41.5,412.5,0],
        [0,3,6, -123.75,247.5,90],
        [1,4,7, 41.25,247.5,90],
        [2,5,8, 206.25,247.5,90],
        [0,4,8, 41.25,247.5,45],
        [2,4,6, 41.25,247.5,-45],
    ]
    wins.forEach(e=>{
        if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[1]].innerText === boxTexts[e[2]].innerText) && (boxTexts[e[0]].innerText !== '')){
            gameOver = true;
            document.getElementById("turn").innerText = boxTexts[e[0]].innerText + " WON!!!";
            document.getElementsByClassName("dancing")[0].style.width = "180px";
            document.getElementsByClassName("pop")[0].style.width = "130px";
            document.querySelector('.line').style.width = "410px";
            document.querySelector('.line').style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`
            win.play();
            success.play();
        }
    })
}


Array.from(boxes).forEach(element =>{
    gamemusic.play();
    let boxText = element.getElementsByClassName('boxText')[0];


    element.addEventListener('click',()=>{
        if(boxText.innerText === ''){
            if (!gameOver){
                boxText.innerText = turn;
                turn = changeTurn();
                checkWin();
                ting.play();
                element.style.background = "rgba(187, 112, 187, 0.25)";
                document.getElementById("turn").innerText = "Turn for " + turn;
            }
        }
    })
})


//reset button
document.getElementById('reset').addEventListener('click',()=>{
    let boxTexts = document.getElementsByClassName("boxText");
    Array.from(boxTexts).forEach((e)=>{
        e.innerText = '';
    })
    turn = 'X';
    document.getElementById("turn").innerText = "Turn for " + turn;
    document.getElementsByClassName("dancing")[0].style.width = "0px";
    document.getElementsByClassName("pop")[0].style.width = "0px";
    document.querySelector('.line').style.width = "0vw";
})

// background music controls
let bgmusic = false;
document.getElementById("bgmusic").addEventListener('click',()=>{
    let musicIcon = document.getElementsByClassName('bgmusicIcon')[0];
    if (!bgmusic){
        musicIcon.classList.remove("fa-music");
        musicIcon.classList.add("fa-volume-xmark");
        gamemusic.pause();
        bgmusic = true;
    }
    else{
        musicIcon.classList.remove("fa-volume-xmark");
        musicIcon.classList.add("fa-music");
        gamemusic.play();
        bgmusic = false;
    }
})

// Move Sound controls
let chanceSound = false;
document.getElementById("chanceSound").addEventListener('click',()=>{
    let chanceSoundIcon = document.getElementsByClassName('chanceSoundIcon')[0];
    if (!chanceSound){
        console.log("hello");
        chanceSoundIcon.classList.remove("fa-music");
        chanceSoundIcon.classList.add("fa-volume-xmark");
        ting.pause();
        ting = null;
        chanceSound = true;
    }
    else{
        chanceSoundIcon.classList.remove("fa-volume-xmark");
        chanceSoundIcon.classList.add("fa-music");
        chanceSound = false;
        ting = new Audio("./ting.mp3");
    }
})
