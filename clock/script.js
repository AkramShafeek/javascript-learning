let hand = document.getElementById('secondsHand');
let clockContainer = document.getElementById('handsContainer');
let i = 0;
setInterval(()=>{
    if(i === 0){
        hand.remove();
        hand.style.transform = `translateY(-50%) rotate(${i*6}deg)`;
        clockContainer.append(hand);
    }
    else
        hand.style.transform = `translateY(-50%) rotate(${i*6}deg)`;
        
    i = (i + 1) % 60
},1000)