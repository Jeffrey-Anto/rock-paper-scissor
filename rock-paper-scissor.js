let score= JSON.parse(localStorage.getItem('points'));
if(!score){
    score={
        wins:0,
        loses:0,
        tie:0
    };
}

document.body.addEventListener('keydown', ()=>{
    Keyboard(event);
})

function Keyboard(event){
    if(event.key==='r' || event.key==='R'){
        player('rock');
    }
     else if(event.key==='p' || event.key==='P'){
        player('paper');
    }
    else if(event.key==='s' || event.key==='S'){
        player('scissor');
    }
    else if(event.key==='a' || event.key==='A'){
        autoPlay();
    }
    else if(event.key==='Backspace'){
        confirm();
    }
}

let confirmation=document.querySelector('.confirm-button');
function confirm(){
    confirmation.innerHTML=`
        <button class="yes-button" onclick="
            resetScore();
            confirmation.innerHTML=''; ">Yes</button>
        <button class="no-button" onclick="
        confirmation.innerHTML='';">No</button>`;
}

let computerMove='';
function computer(){
    let number= Math.random();
    if(number>0 && number<=1/3){
        computerMove='rock';
    } else if(number>1/3 && number<=2/3){
        computerMove='paper';
    } else{
        computerMove='scissor';
    }
}

let id;
function autoPlay(){
    let text= document.querySelector('.autoplay-button');
    if(text.innerHTML==='Auto Play'){
        text.innerHTML='Stop Playing';
        id=setInterval(()=>{
            computer();
            let move=computerMove;
            player(move);
        },1000);
    } else if(text.innerHTML='Stop Playing'){
        clearInterval(id);
        text.innerHTML='Auto Play';
    }
}

function player(playerMove){
    let result='';
    computer();
    if(playerMove===computerMove){
        result='Tie';
        score.tie++;
    } else if(playerMove==='rock'&& computerMove==='paper' || playerMove==='paper'&& computerMove==='scissor' || playerMove==='scissor'&& computerMove==='rock'  ){
        result='You lose';
        score.loses++;
    } else if(playerMove==='rock'&& computerMove==='scissor' || playerMove==='paper'&& computerMove==='rock' || playerMove==='scissor'&& computerMove==='paper'  ){
        result='You win';
        score.wins++;
    }
    
    document.querySelector('.result').innerHTML= `${result}`;
    document.querySelector('.choice').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="image-icon"> <img src="images/${computerMove}-emoji.png" class="image-icon"> Computer`
    localStorage.setItem('points',JSON.stringify(score));
    printscore();
}

function resetScore(){
    score.wins=0;
    score.loses=0;
    score.tie=0;
    localStorage.removeItem('points');
    document.querySelector('.result').innerHTML= '';
    document.querySelector('.choice').innerHTML='';
    printscore();
}

function printscore(){
    document.querySelector('.score').innerHTML=`Wins:${score.wins}, Losses:${score.loses}, Ties:${score.tie}`;
}
