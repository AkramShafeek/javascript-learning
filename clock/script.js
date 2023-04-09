let secondsHand = document.getElementById('secondsHand');
let minutesHand = document.getElementById('minutesHand');
let hoursHand = document.getElementById('hoursHand');

let handsContainer = document.getElementById('handsContainer');

var i;
var time = new Date();
var hours = time.getHours() % 12;
var minutes = time.getMinutes();
var seconds = time.getSeconds();

function initializeClock(){
    i = seconds
    secondsHand.style.transform = `translateY(-50%) rotate(${seconds*6}deg)`;
    minutesHand.style.transform = `translateY(-50%) rotate(${minutes*6 + 0.1*seconds}deg)`;
    hoursHand.style.transform = `translateY(-50%) rotate(${hours*30 + 0.5*minutes + (1/120)*seconds}deg)`;

}

initializeClock();

function updateClock(){
    seconds++;
    
    secondsHand.style.transform = `translateY(-50%) rotate(${seconds*6}deg)`;
    minutesHand.style.transform = `translateY(-50%) rotate(${minutes*6 + seconds*(1/10)}deg)`;
    hoursHand.style.transform = `translateY(-50%) rotate(${hours*30 + + 0.5*minutes + seconds*(1/120)}deg)`;
    
    if(seconds == 60){
        seconds = 0;
        setTimeout(()=>{
            secondsHand.remove();
            secondsHand.style.transform = `translateY(-50%) rotate(${seconds*6}deg)`;
            handsContainer.append(secondsHand);
        },100)
        minutes++;
    }
    if(minutes == 60){
        minutes = 0;
        setTimeout(()=>{
            minutesHand.remove();
            minutesHand.style.transform = `translateY(-50%) rotate(${minutes*6 + seconds*(1/10)}deg)`;
            handsContainer.append(minutesHand);
        },100)
        hours++;
    }
    if(hours == 12){
        setTimeout(()=>{
            hoursHand.remove();
            hoursHand.style.transform = `translateY(-50%) rotate(${hours*30 + + 0.5*minutes + seconds*(1/120)}deg)`;
            handsContainer.append(hoursHand);
        },100)
        hours = 0;
    }
}


function myfunction(){
    updateClock()
}

setInterval(updateClock,1000)

var darkmode = true;
var lightui = document.getElementById('lightui');
lightui.remove();
function toggleui(){
    if(darkmode){
        // append light mode css file
        document.head.append(lightui);
    }
    else{
        // remove light move css file
        lightui.remove()
    }

    darkmode = !darkmode
}