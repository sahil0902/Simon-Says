let gameSeq = [];
let userSeq = [];
let score = 0;

let btns = ["orange","red","blue","purple"];

let started = false;
let level = 0;
let counter = 0;

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Started!");
        started = true;
        levelUp();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
    btn.classList.remove("flash");
    },1000);
}

function UserbtnFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
    btn.classList.remove("userflash");
    },1000);
}
function reset(){
  
        started = false;
        level = 0;
        userSeq = [];
        gameSeq = [];
      

}

function levelUp(){
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
 
}

function seqCheck(index){
    
    console.log(`${level}`);
    // let index = level-1;
    if (userSeq[index]== gameSeq[index]) {
        score++;
       if(userSeq.length == gameSeq.length){
        setTimeout(levelUp,1000);
       }
    }
    else {
        h2.innerText = `Game Over at level ${level}\nScore\t${score}...Press any key to start`;
        reset();
    }
}
function btnPress(){
    let btn = this;
    let UserColor = btn.getAttribute("id");
    console.log(UserColor);
    UserbtnFlash(btn);
    userSeq.push(UserColor);
    seqCheck(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
    
}