let gameSeq = [];
let userSeq = [];
let score = 0;


let btns = ["orange", "red", "blue", "purple"];

let started = false;
let level = 0;
let counter = 0;
let highestScore = [];
let gamecounter = 0;
let max = 0;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let scores = document.querySelector("h4");
let stButton = document.querySelector(".wrapper");
let USeq = document.querySelector("#ut");
let CSeq = document.querySelector("#ct");
let colBoxes = document.querySelector(".btn-container")



document.addEventListener("keypress", function() {
    if (!started) {
        gamecounter++;
        console.log("Started!");
        started = true;
        let allBtns = document.querySelectorAll(".btn");
        for (btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
        levelUp();
    }

});

stButton.addEventListener("click", function() {

    if (!started) {
        gamecounter++;
        let allBtns = document.querySelectorAll(".btn");
        for (btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
        stButton.style.display = "none";

        CSeq.classList.remove("ct");
        USeq.classList.remove("ut");
        console.log("Started!");
        started = true;
        levelUp();
    }
});


function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 1000);
}

function UserbtnFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 1000);
}

function playSound(color) {
    console.log("Playing sound for color:", color); // Debug line
    const soundId = color + 'Sound'; // This will now correctly create IDs like 'blueSound'
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.volume = 1; // Set volume
        sound.muted = false; // Ensure not muted
        sound.play().catch(e => console.error("Error playing sound:", e));
    } else {
        console.error("Sound element not found for color:", color);
    }
}

function reset() {

    started = false;
    level = 0;
    score = 0;
    stButton.style.display = "block";
    userSeq = [];
    gameSeq = [];



}

function levelUp() {

    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    console.log(randIdx);
    let randColor = btns[randIdx];
    console.log(randColor);
    //Add the color to the sequence
    gameSeq.push(randColor);
    let randbtn = document.querySelector(`#${randColor}`);
    console.log(randbtn);
    btnFlash(randbtn);
    playSound(randColor);

}

function seqCheck(index) {

    console.log(`${level}`);
    // let index = level-1;
    if (userSeq[index] == gameSeq[index]) {
        score++;
        scores.innerText = `Score:${score}`;
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {

        console.log(gamecounter);
        if (gamecounter > 0) {
            highestScore.push(score);
            console.log(highestScore);
            // for(let i = 0 ; i < highestScore.length ; i++){
            //     max = Math.max(highestScore[i]);
            // }
            max = Math.max(...highestScore);
        }


        console.log("Highest:", max);
        h2.innerText = `Game Over at level ${level}\nScore\t${score}...Press any key to start`;
        USeq.classList.add("ut");
        CSeq.classList.add("ct");
        let UserSelection = userSeq.join('->');
        let CorrectSelection = gameSeq.join('->')
        if (started == true) {
            USeq.innerText = `Your Sequence :${UserSelection}`;
            CSeq.innerHTML = `Correct Sequence:${CorrectSelection}`;
        }
        stButton.classList.add("stButton");
        setTimeout(() => {
            body.style.backgroundColor = "";
        }, 1000);
        reset();
    }
}

// Add CSS media queries for responsiveness
const mediaQuery = window.matchMedia("(max-width: 600px)");

function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
        // Apply responsive styles for small screens
        h2.style.fontSize = "16px";
        scores.style.fontSize = "14px";
    } else if (mediaQuery.matches && mediaQuery.orientation === "portrait") {
        // Apply responsive styles for portrait orientation
        h2.style.fontSize = "18px";
        scores.style.fontSize = "16px";
    } else {
        // Apply default styles for larger screens and landscape orientation
        h2.style.fontSize = "24px";
        scores.style.fontSize = "18px";
    }
}




// Call the function on initial load
handleMediaQueryChange(mediaQuery);

// Listen for media query changes
mediaQuery.addListener(handleMediaQueryChange);

// Listen for media query changes
mediaQuery.addListener(handleMediaQueryChange);

function btnPress() {
    if (started == false) {
        if (window.matchMedia("(max-width: 600px)").matches) {
            alert("Press Start Button to start again 😀");
        } else {
            alert("Press any key to start again 😀");
        }
    } else {
        let btn = this;
        let UserColor = btn.getAttribute("id");
        console.log(UserColor);
        UserbtnFlash(btn);
        userSeq.push(UserColor);
        seqCheck(userSeq.length - 1);
        if (gamecounter > 1) {
            scores.innerHTML = `Score:${score}\t\tGames Played:${gamecounter}\t\tHighest Score:${max}`;
        }
    }
}