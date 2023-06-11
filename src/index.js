let dogList=[];
let dogID;
let dogData;
document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(json => {
        let dogData = document.getElementById('table-body');
        while (dogData.firstChild) {
            dogData.removeChild(dogData.firstChild);
        }
        dogList = json
        dogList.forEach((dog, index) => {
            let dogRow = document.createElement('tr');
            let dogName = document.createElement('td');
            dogName.innerText = dog.name;
            dogRow.appendChild(dogName);
            let dogBreed = document.createElement('td');
            dogBreed.innerText = dog.breed;
            dogRow.appendChild(dogBreed);
            let dogSex = document.createElement('td');
            dogSex.innerText = dog.sex;
            dogRow.appendChild(dogSex);
            let dogEdit = document.createElement('td');
            let dogEditBtn = document.createElement('button');
            dogEditBtn.id = `${dog.name}-${index+1}`;
            dogEditBtn.innerText = 'Edit';
            dogEditBtn.addEventListener('click', event => editDog(event));
            dogEdit.appendChild(dogEditBtn);
            dogRow.appendChild(dogEdit); 
            dogData.appendChild(dogRow);
        })
    });
}
function editDog(event) {
    const nameInput = document.querySelector('input[name="name"]');
    const breedInput = document.querySelector('input[name="breed"]');
    const sexInput = document.querySelector('input[name="sex"]');
    dogID = event.target.id.split('-');
    dogData = dogList.find(dog => dog.name === dogID[0]);
    nameInput.value = dogData.name;
    breedInput.value = dogData.breed;
    sexInput.value = dogData.sex;
    const dogForm = document.getElementById('dog-form');
    dogForm.addEventListener('submit', event => {
        event.preventDefault();
        fetch(`http://localhost:3000/dogs/${dogID[1]}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameInput.value,
                breed: breedInput.value,
                sex: sexInput.value,
            }),
        })
        .then (response => response.json())
        .then (json => {
            dogForm.reset();
            fetchDogs()
        });
    });
}