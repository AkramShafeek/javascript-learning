var imageSwitcher = setInterval(switchImage, 10100);
var index = 0;
var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
var numberOfImages = images.length;

switchImage();

function switchImage() {
    let imgName = images[index];

    let progressContainer = document.getElementById('progressBarContainer');
    let progressLine = document.getElementById('progressLine');
    let img = document.getElementById('carouselImages');
    
    progressLine.remove();
    progressLine.style.width = '1.5%';
    progressContainer.append(progressLine);
    img.style.transform = 'rotateY(-45deg) translate(-90%)' 
    img.style.opacity = '0';
    
    setTimeout(() => {
        progressLine.style.width = '100%';
    },50);

    setTimeout(() => {
        img.src = './images/' + imgName;
        img.style.transform = 'rotateY(45deg) translate(90%)' 
    }, 500);
    
    setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'rotateY(0deg) translate(0%)' 
    }, 700);


    index = (index + 1) % numberOfImages;
}
