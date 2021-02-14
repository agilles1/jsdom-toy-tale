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

  const toyUrl = "http://localhost:3000/toys"
  fetch(toyUrl)
  .then(function(response){
    return response.json()
  })
  .then(function(objs){
    objs.forEach(makeToyCard)
  })
});

function makeToyCard(obj){
  let div = document.getElementById("toy-collection")
  let innerDiv = document.createElement("div")
  innerDiv.setAttribute("class", "card")
  let header = document.createElement("h2")
  let image = document.createElement("img")
  image.setAttribute("class", "toy-avatar")
  let pTag = document.createElement("p")
  let button = document.createElement("button")
  button.setAttribute("class", "like-btn")
  button.setAttribute('id', obj.id)
  button.innerText = "like"
  header.innerText = obj.name
  image.src = obj.image 
  pTag.innerText = obj.likes
  button.innerText = "Like"
  innerDiv.appendChild(header)
  innerDiv.appendChild(image)
  innerDiv.appendChild(pTag)
  innerDiv.appendChild(button)
  div.appendChild(innerDiv)
}
let submit = document.getElementById("new-toy-submit")
submit.addEventListener("click", function(event) {
  event.preventDefault();  
  let name = document.getElementsByClassName("input-text").name.value
  let image = document.getElementsByClassName("input-text").image.value
  createNewToy(name, image)})

function createNewToy(name, image){
  debugger
     let formData = {
        name: name,
        image: image,
        likes: "0"
      };
      
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      const destinationUrl = 'http://localhost:3000/toys'
      
      fetch(destinationUrl, configObj)
}

let buttons = document.getElementsByClassName("like-btn")

buttons.forEach(addEventListener("click", function(e){
    console.log(e.target.dataset);
    likes(e)
  }))

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}