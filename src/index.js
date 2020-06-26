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

let addToy = false;
const divToy = document.getElementById('toy-collection') // we are getting all the toys div or the parent of where the toys will be added to
const toyData = ()=>{ fetch ("http://localhost:3000/toys") //we are asking js to grab this url and we wrap it in a function
.then(resp => resp.json()) // .then we are asking give me the response in JSON format
.then(json =>{json.forEach(toy => renderToys(toy))}) // whe are gonna grab the json info and do a .each loop into the render form function
divToy;} 
function renderToys(toy) { // the function will render the list
  const toyDiv = document.createElement("div") // we are going to create a div to place all the toy data in
  toyDiv.className = "card" // with a class name of card (class="card")
  toyDiv.dataset.id = toy.id // we are gonna add a dataset to make sure we can trace this later on with the id that the database gives it kinda like primary key
  // in active record we dont assign it. it gets assigned automatically
  toyDiv.innerHTML = ` 
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p> ${toy.likes} </p>
  <button class="like-btn">Like <3</button>
  ` //form using "toy" from the rendertoys function
  divToy.append(toyDiv) //we are go add the toy list from the parent as a child (parent(divToy)=====>(child(toyDiv)))
}
toyData() //calling the fetch data

//add the likes to the API/DATABASE
divToy.addEventListener('click', function(e){ //Going to listen to a click on any of the toys
  if (e.target.className === "like-btn") { //whatever toy gets clicked on its going to look for the button 
    let likes = e.target.parentNode.querySelector('p') // getting the text above the button which is the like count into a variable
    likes.textContent = parseInt(likes.textContent) + 1 //so every click of the btn will go into the text content of the like count and add one
    fetch(`http://localhost:3000/toys/${e.target.parentNode.dataset.id}`, { //to update our data we are gonna fetch a post request with the id of the toy
    // this is where having the data set comes into play because we can look for the id 
      method: 'PATCH', //patching/updating
      headers: {
        'Content-Type': 'application/json', //json format
      },
      body: JSON({ 
        "likes":`${likes.textContent}` //instead of placing static numbers we are gonna use the text count of likes and place that into the API
      })
    })
    .then(response => response.json())
    .then(toyObj => {
      console.log('Success:', toyObj);
    })
    .catch((error) => {
      console.error('Error:', error);
    })}});


const submitHandler = () => {
  document.addEventListener('submit', e => {
    const form = e.target 
    const name= form.name.value
    const image = form.image.value
   
    const toyObj = {
      name: name,
      image: image,
      likes : 0
    }
    fetch("http://localhost:3000/toys", {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(toyObj),
})
.then(response => response.json())
.then(toyObj => {
  console.log('Success:', toyObj);
})
.catch((error) => {
  console.error('Error:', error);
});
    form.reset()
  })
}
submitHandler()
});