var timer = setInterval(animateBar, 2000);
var time = 0;
var value = 0;

var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
var numberOfImages = images.length;

function animateBar() {
    if (time >= numberOfImages) {
        clearInterval(timer);
        return
    }
    increaseProgress(value++);
    time++;
}

function increaseProgress(value) {
    let img = document.querySelector('img');
    img.style.opacity = '0';

    let progressBar = document.getElementById('progressBar');
    progressBar.style.strokeDasharray = progressBar.getTotalLength();
    progressBar.style.strokeDashoffset = progressBar.getTotalLength() * (1 - (value + 1) / numberOfImages);
    
    setTimeout(() => {
        progressBar.style.stroke = "rgb(7, 19, 32)";
        img.src = './images/' + images[value];
        img.style.opacity = '1'
    }, 200)
}