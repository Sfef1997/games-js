
//  acsess the Start button

let startGame= document.querySelector(".control-buttons span")
startGame.onclick=function(){

    let yourName = prompt("What is Your Name?")

    // add the user name for this Game
    if (yourName== null || yourName == ""){
        document.querySelector(".name span").innerHTML= "XXX";

    } else{
  document.querySelector(".name span").innerHTML=yourName;
    }
// remove the StartGame button 
    document.querySelector(".control-buttons").remove(); 
    //  StartTimer Function
     startTimer();
};


//  Timer 


  let seconds = 00; 
  let min = 00; 
  let appendMin = document.getElementById("min")
  let appendSeconds = document.getElementById("seconds")

  let timer= document.querySelector(".timer")
  

 function startTimer(){
    setInterval(() => {
        seconds++
         if(seconds <= 9){
      appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;   
    }
    
     if (seconds > 59) {
        min++;
      appendMin.innerHTML = "0" + min;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
     }

       if (min > 9){
      appendMin.innerHTML = min;
    }
    }, 1000);

 }
let duration = 1000,

//  select blocks Container
 blocksContainer = document.querySelector(".memory-game-blocks"),

//  Creat Array from Game blocks
 blocks= Array.from(blocksContainer.children),
//  Creat range of Keys
 orderRange = [...Array(blocks.length).keys()];

schuffle(orderRange)
// add order property  to Game Blocks

blocks.forEach((block,index)=>{
    //  Add css property order
    block.style.order=orderRange[index];
    //  Add click Event
    block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});


//  flip block funtion

function flipBlock(selectedblock){

    selectedblock.classList.add("is-filpped")


    //  collect all flibed card

let allflipped=blocks.filter(ele=>ele.classList.contains("is-filpped"));

    if(allflipped.length === 2){
        //  stop clicking function
   stopclicking();

//  check Matched function
  checkMatchedBlock(allflipped[0],allflipped[1]);

    }
    //stop the fucking game if it is finished
    if(allflipped.length === 20){
      alert('all are opnned');

    }
    console.log('allflipped ====  ',allflipped);
}


 // Stop clicking function
function stopclicking(){
blocksContainer.classList.add("no-cliking")

setTimeout(() => {
    
    //  Remove class no-cliking After Duration
    blocksContainer.classList.remove("no-cliking")

},duration );
}

// check Matched Block

function checkMatchedBlock(fBlock,sBlock){
    let triesEle= document.querySelector(".tries span")

    if(fBlock.dataset.technolgy === sBlock.dataset.technolgy){
        fBlock.classList.remove("is-filpped");
        sBlock.classList.remove("is-filpped");
 
        fBlock.classList.add("is-matched");
        sBlock.classList.add("is-matched");
  
        

 }else{
    triesEle.innerHTML =Number(triesEle.innerHTML) + 1; 
       
    // refrech the Game
    if(triesEle.innerHTML == 20 ){
        prompt ("you Lose the gane")
            window.location.reload()
    }
   setTimeout(() => {
          fBlock.classList.remove("is-filpped");
        sBlock.classList.remove("is-filpped");
   }, duration);
 }
}

// schuffle funtion
function schuffle(arr){

    let current=arr.length,
    temp,
    random;

while(current > 0 ){

    // get random Nuumber
    random=Math.floor(Math.random() * current);

    // drcrease length by one
    current--;
// [1] Save Current Element in Stash
     temp= arr[current];
   // [2] Current Element = Random Element
    arr[current] = arr[random];
     // [3] Random Element = Get Element From Stash

    arr[random] =temp;
}
return arr;
};

