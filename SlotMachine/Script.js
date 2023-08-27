const images = [
    'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png', 'j.png',  // 30%
    'q.png', 'q.png', 'q.png', 'q.png', 'q.png', 'q.png', 'q.png', 'q.png', 'q.png', 'q.png',  // 20%
    'k.png', 'k.png', 'k.png', 'k.png', 'k.png', 'k.png',  // 15%
    'gato.png', 'gato.png', 'gato.png', 'gato.png', 'gato.png', 'gato.png',  // 15%
    'piramid.png', 'piramid.png', 'piramid.png', 'piramid.png', 'piramid.png', 'piramid.png',  // 12%
    'libro.png', 'libro.png'  // 8%
];

const reels = document.querySelectorAll('.reel');
const linea1 = [reels[0], reels[1], reels[2], reels[3], reels[4]];
const linea2 = [reels[5], reels[6], reels[7], reels[8], reels[9]];
const linea3 = [reels[10], reels[11], reels[12], reels[13], reels[14]];
const linea4 = [reels[0], reels[6], reels[12], reels[8], reels[4]];
const linea5 = [reels[10], reels[6], reels[2], reels[8], reels[14]];


function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function setRandomImage(reel) {
    const randomIndex = getRandomIndex(images.length);
    const randomImage = images[randomIndex];
    reel.style.backgroundImage = `url(${randomImage})`;
}

function getImageNameFromReel(reel) {
    const backgroundImage = reel.style.backgroundImage;
    let imageName = backgroundImage.replace('url("', '').replace('")', '').replace('.png', '');
    if (imageName.toLowerCase() === 'piramid') {
        imageName = imageName.replace('piramid', 'x2');
    } else if (imageName.toLowerCase() === 'j') {
        imageName = imageName.replace('j', 'x05');
    } else if (imageName.toLowerCase() === 'q') {
        imageName = imageName.replace('q', 'x1');
    } else if (imageName.toLowerCase() === 'k') {
        imageName = imageName.replace('k', 'x5');
    } else if (imageName.toLowerCase() === 'gato') {
        imageName = imageName.replace('gato', 'x10');
    } else if (imageName.toLowerCase() === 'libro') {
        imageName = imageName.replace('libro', 'x100');
    }
    return imageName;
}

function checkEquality(linea, message) {
    const reelImageNames = linea.map(getImageNameFromReel);
    if (
        reelImageNames[0] === reelImageNames[1] &&
        reelImageNames[1] === reelImageNames[2]
    ) {
        const winMessage = document.getElementById('win-message');
        if (winMessage.textContent) {
            winMessage.textContent += '\n'; // Agrega un salto de línea si ya hay un mensaje
        }
        winMessage.textContent += `¡Felicidades! ${message} son iguales. Ganancia: ${reelImageNames[0]}`;
        linea.forEach((reel) => {
            reel.classList.add('winner'); // Agrega la clase winner a los carretes ganadores
        });
    }
}

function spinReels() {
    spinButton.disabled = true; // Deshabilita el botón mientras gira
    const winMessage = document.getElementById('win-message');
    winMessage.textContent = ''; // Reinicia el mensaje en cada giro

   
    reels.forEach((reel) => {
        const randomIndex = getRandomIndex(images.length);
        const randomImage = images[randomIndex];
        reel.style.backgroundImage = `url(${randomImage})`;
        reel.classList.add('animate'); // Agrega la clase de animación
        reel.classList.remove('winner'); // Remueve la clase winner
    });
    setTimeout(() => {
        checkEquality(linea1, "Los carretes 1, 2 y 3");
        checkEquality(linea2, "Los carretes 6, 7 y 8");
        checkEquality(linea3, "Los carretes 11, 12 y 13");
        checkEquality(linea4, "Los carretes 1, 7 y 13");
        checkEquality(linea5, "Los carretes 11, 7 y 3");
        reels.forEach((reel) => {
            reel.classList.remove('animate'); // Elimina la clase de animación
        });
        spinButton.disabled = false; // Habilita el botón después de detenerse
    }, 900); // Ajusta el tiempo de espera según la duración de la animación
}



const spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', () => {
    spinReels();
});
