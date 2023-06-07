const left = document.querySelector('.left');
const right = document.querySelector('.right');
const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.image');
const bottom = document.querySelector('.bottom');

let slideNumber = 1;
const length = images.length;

const nextSlide = () => {
    slider.style.transform = `translateX(-${slideNumber * 800}px)`;
    slideNumber++;
};

const prevSlide = () => {
    slider.style.transform = `translateX(-${(slideNumber - 2) * 800}px)`;
    slideNumber--;
};

const getFirstSlide = () => {
    slider.style.transform = `translateX(0px)`;
    slideNumber = 1;        /* Reset to start */
};

const getLastSlide = () => {
    slider.style.transform = `translateX(-${(length - 1) * 800}px)`;
    slideNumber = length;
};

const toggleButton = () => {
    resetBackground();
    buttons[slideNumber - 1].style.backgroundColor = 'white';
};

right.addEventListener('click', () => {
    slideNumber < length ? nextSlide() : getFirstSlide();
    toggleButton();
});

left.addEventListener('click', () => {
    slideNumber > 1 ? prevSlide() : getLastSlide();
    toggleButton();
});

for(let i = 0; i < length; i++) {
    const div = document.createElement('div');
    div.className = 'button';
    bottom.appendChild(div);
}; 

const buttons = document.querySelectorAll('.button');
buttons[0].style.backgroundColor = 'white';

const resetBackground = () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'transparent';
    })
};

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        resetBackground();
        button.style.backgroundColor = 'white';
        slider.style.transform = `translateX(-${i * 800}px)`;
        slideNumber = i + 1;
    });
} );