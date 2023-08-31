let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// fetch all toys from api
fetch('http://127.0.0.1:3000/toys')
.then((resp) => resp.json())
.then((data) => renderToyCards(data))

function renderToyCards(toyArr){
  // console.log(toyArr)

  const toyCollection = document.getElementById('toy-collection')
  // console.log(toyCollection)

  toyArr.forEach((toyObj) => {
    // console.log(toyObj) keys; id,image,likes,name
    const card = document.createElement('div')
    card.className = 'card'
    
    const h2 = document.createElement('h2')
    h2.textContent = toyObj.name
    card.append(h2)
    
    const img = document.createElement('img')
    img.src = toyObj.image
    img.alt = toyObj.name
    img.className = 'toy-avatar'
    card.appendChild(img)

    const p = document.createElement('p')
    let currentLikes = toyObj.likes
    p.textContent = currentLikes + " likes"
    card.append(p)

    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toyObj.id
    button.textContent = "Like <3"
    card.append(button)
    // console.log(card)

    button.addEventListener('click', incrementLikes)

    function incrementLikes(e){
      currentLikes++
      p.textContent = currentLikes + " likes"
      // let newLikes = currentLikes + 1
      // p.textContent = newLikes + " likes" WILL NOT WORK
    }

    toyCollection.append(card)
  });
}

const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', (e) => addNewToy(e))

function addNewToy(e) {

  e.preventDefault()

  const newToyObj = {
    id: 9,
    image: e.target.image.value,
    likes: 0,
    name: e.target.name.value
  }

  renderToyCards([newToyObj])
}