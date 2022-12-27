const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];




// select levels
const lvls={
    "Easy":7,
    "Normal": 5,
    "Hard": 3,
};



// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let loScore=document.querySelector(".local-score")
let selectBox=document.querySelector("#select-box")
let easyLvl=document.querySelector("#easy")
let normalLvl=document.querySelector("#normal")
let hardLvl=document.querySelector("#hard")
let gameInfo=document.querySelector(".info")
let btnInfo=document.querySelector(".info button")

//  hidden the info Block

btnInfo.onclick=function(){
        gameInfo.style.display="none"
}

//  setting level Name + Secound +Score
let defualtLevelName = "Easy"; 
let defualtLevelSecound=lvls[defualtLevelName];
lvlNameSpan.innerHTML=defualtLevelName;
secondsSpan.innerHTML=defualtLevelSecound;
scoreTotal.innerHTML=words.length;

// change the level
selectBox.addEventListener('change', function handleChange(event) {
    // ##################
//   console.log(event.target.value); 
//  get selected VALUE 
lvlNameSpan.innerHTML=event.target.value

if(lvlNameSpan.innerHTML=="Easy"){
       defualtLevelName="Easy";
       secondsSpan.innerHTML="8";
       defualtLevelSecound=secondsSpan.innerHTML;
    
}else if(lvlNameSpan.innerHTML=="Normal"){
        defualtLevelName="Normal";
           secondsSpan.innerHTML="5";     
         defualtLevelSecound=secondsSpan.innerHTML;

}else if(lvlNameSpan.innerHTML="Hard"){
        defualtLevelName="Hard";
        secondsSpan.innerHTML="3";;
         defualtLevelSecound=secondsSpan.innerHTML;
}

});

// Disable paste Event 
input.onpaste = function () {
  return false;
}
//  Start Game

startButton.onclick=function(){
   this.remove();
   input.focus();
//    Generate Word Function
    genWords();
}

// ####################
function genWords(){
//  Get Random Word From Araay

let randomWord= words[Math.floor(Math.random() * words.length)]

//  Get word Index
let indexWord=Math.floor(Math.random() * words.length)
//  Remove Word From Array

words.splice(indexWord,1);
//  Show the Random Word
theWord.innerHTML=randomWord;
// Empty upcoming Word
upcomingWords.innerHTML = "";
//  Generate words

for(let i=0; i<words.length; i++){
//  creat Div Element

let  div =document.createElement("div")
let txt= document.createTextNode(words[i]);
div.appendChild(txt)
upcomingWords.append(div)
    }
    //  Start play Funtion
  startPlay()
  
};
// #########################

function startPlay(){
    timeLeftSpan.innerHTML = defualtLevelSecound;
    let start= setInterval(() => {
        timeLeftSpan.innerHTML--;

        if(timeLeftSpan.innerHTML === "0" ){
            // stop Timer
            clearInterval(start)
            // compare Words
            if(theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()){
            //   Empty input Field
            input.value= "";
            // increase Score
            scoreGot.innerHTML++;
            //  Save the score in localStorage
            window.localStorage.setItem("score",scoreGot.innerHTML)
            window.localStorage.getItem("score")
           
            if(words.length > 0){
                //  call GenWords Funtion
                genWords();
            }else{
                let span=document.createElement("span")
                span.className="good";
                let spanTxt= document.createTextNode("good job")
                span.appendChild(spanTxt)
                finishMessage.appendChild(span)

                //  Remove uupcoming Wods Box
                upcomingWords.remove();
            } 
            }else{
                let span=document.createElement("span");
                span.className="bad";
                let spanTxt=document.createTextNode("Game Over")
                span.appendChild(spanTxt)
                finishMessage.append(span)
                // Display the scoure when the Game Finsih
                if(window.localStorage.getItem("score")){
                     let div=document.createElement("div")
                    let txt=document.createTextNode(`your Score is :${window.localStorage.getItem("score")}`)
                        div.appendChild(txt)
                        loScore.appendChild(div)
                    }
                      //  Remove the local Storage by onload the page  
                        clearLocalStorage();
            }
        }
    }, 1000); 
}


//  clear local Storage Function
function clearLocalStorage(){
                window.onload= window.localStorage.clear()
}