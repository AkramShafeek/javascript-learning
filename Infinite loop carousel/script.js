var carouselContainer = document.getElementsByClassName('carouselContainer')[0];
var slider = document.getElementsByClassName('slider')[0];
var front = 0;
var length = 7;
var preview = 3;
var slideOffset = 210;

document.getElementById('left').addEventListener('click',left);
document.getElementById('right').addEventListener('click',right);

init();

function init() {
    // here append first preview number of elements to the back
    // and last preview number of elements to the front
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
    slider.style.transform = `translateX(-${(preview) * slideOffset}px)`
}

function right() {
    console.log('right')
    if (front == length) {
        // reset here
        slider.style.transition = '0s';
        front = 0;
        slider.style.transform = `translateX(-${(front + preview) * slideOffset}px)`
        return;
    }
    slider.style.transition = '1s ease-in-out';
    slider.style.transform = `translateX(-${(front + preview + 1) * slideOffset}px)`;
    front++;
}

function left() {
    if (front == -preview) {
        // reset here
        slider.style.transition = '0s';
        front = length - preview;
        slider.style.transform = `translateX(-${(front + preview) * slideOffset}px)`
        return;
    }
    slider.style.transform = `translateX(-${(front + preview - 1) * slideOffset}px)`;
    slider.style.transition = '1s ease-in-out';
    front--;
}
