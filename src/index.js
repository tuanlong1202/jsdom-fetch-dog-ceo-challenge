console.log('%c HI', 'color: firebrick')

const imgURL = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let breeds = [];

document.addEventListener('DOMContentLoaded', function() {
    loadImage();
    loadBreed();
})

function loadImage() {
    fetch(imgURL)
        .then(response => response.json())
        .then(data => data.message.forEach(element => {
            let imgContainer = document.getElementById('dog-image-container');
            let newImage = document.createElement('img');
            newImage.src = element;
            imgContainer.appendChild(newImage);
        }));
}

function loadBreed() {
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message);
            addBreed(breeds);
            dropBoxChose();
        });
}

function addBreed(breed) {
    let dogBreeds = document.getElementById('dog-breeds');
    removeChild(dogBreeds);
    breed.forEach(itemBreed => {
        let newLI = document.createElement('li');
        newLI.style.cursor = 'pointer';
        newLI.addEventListener('click', colorChange);
        newLI.innerText = itemBreed;
        dogBreeds.appendChild(newLI);
    })
}

function removeChild(eleNode) {
    let child = eleNode.lastElementChild;
    while(child) {
        eleNode.removeChild(child);
        child = eleNode.lastElementChild;
    }
}

function dropBoxChose() {
    let dropBox = document.getElementById('breed-dropdown');
    dropBox.addEventListener('change', updateBreedList);
}

function updateBreedList(e) {
    addBreed(breeds.filter(breed => breed.startsWith(e.target.value)));
}

function colorChange(e) {
    e.target.style.color = 'blue';
}