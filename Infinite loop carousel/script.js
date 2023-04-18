var carouselContainer = document.getElementsByClassName('carouselContainer')[0];
var slider = document.getElementsByClassName('slider')[0];
var front = 0;
var length = 5;
var preview = 3;
var slideOffset = 210;

document.getElementById('left').addEventListener('click',handleLeftClick);
document.getElementById('right').addEventListener('click',handleRightClick);

init();

var slideDuration = 5000;
var loop = setInterval(right,slideDuration);

function handleLeftClick(){
    clearInterval(loop);
    left();
    loop = setInterval(right,slideDuration);
}

function handleRightClick(){
    clearInterval(loop);
    right();
    loop = setInterval(right,slideDuration);
}

function init() {
    // here append first preview number of elements to the back
    // and prepend last preview number of elements to the front
    // and adjust position of the slider accordingly
    let imageContainers = Array.from(slider.children);
    let len = imageContainers.length
    for (let i = 0; i < preview; i++) {
        let clone = imageContainers[i].cloneNode(true);
        slider.append(clone);
    }
    for (let i = 0; i < preview; i++) {
        let clone = imageContainers[len - i - 1].cloneNode(true);
        slider.prepend(clone);
    }
    slider.style.transition = '0s';
    slider.style.transform = `translateX(-${(preview) * slideOffset}px)`;
}

function right() {
    slider.style.transition = '1s ease-in-out';
    slider.style.transform = `translateX(-${(front + preview + 1) * slideOffset}px)`;    
    front++;
    if (front == length) {
        // reset here
        setTimeout(()=>{
            slider.style.transition = '0s';
            front = 0;
            slider.style.transform = `translateX(-${(front + preview) * slideOffset}px)`;
        },1000);
    }
}

function left() {
    slider.style.transform = `translateX(-${(front + preview - 1) * slideOffset}px)`;
    slider.style.transition = '1s ease-in-out';
    front--;
    if (front == -preview) {
        // reset here
        setTimeout(()=>{
            slider.style.transition = '0s';
            front = length - preview;
            slider.style.transform = `translateX(-${(front + preview) * slideOffset}px)`;
        },1000);
    }
}
