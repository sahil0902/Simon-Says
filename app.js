let gameSeq = [];
let userSeq = [];
let score = 0;

let btns = ["orange","red","blue","purple"];

let started = false;
let level = 0;
let counter = 0;
let highestScore = 0;
let gamecounter = 0;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let scores = document.querySelector("h4");




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
        score = 0;
        
        userSeq = [];
        gameSeq = [];
        if (gamecounter > 1) {
            highestScore = score;
            score.innerText = `Score:${score}\nHighest Score:${highestScore}`;
        }
      

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
        if (userSeq[index] == gameSeq[index]) {
                score++;
                scores.innerText = `Score:${score}`;
                if (userSeq.length == gameSeq.length) {
                        setTimeout(levelUp, 1000);
                }
        }
        else {
                gamecounter++;
                h2.innerText = `Game Over at level ${level}\nScore\t${score}...Press any key to start`;
                let h3 = document.createElement("h3");
                h3.classList.add("results");
                h2.appendChild(h3);
                h3.innerHTML = `<table>
                <tr>
                    <th style="color: #0000FF;">Correct Sequence</th>
                    <th style="color: #008000;">Your Sequence</th>
                </tr>
                <tr>
                    <td style="color: #0000FF;">${gameSeq}</td>
                    <td style="color: #008000;">${userSeq}</td>
                </tr>
            </table>
            
            `;
                body.style.backgroundColor = "#FF0000";
                setTimeout(() => {
                        body.style.backgroundColor = "";
                }, 1000);
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