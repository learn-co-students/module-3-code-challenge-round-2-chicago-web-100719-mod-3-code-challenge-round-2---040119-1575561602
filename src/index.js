function fetchBeers(){
    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(beers => renderBeers(beers)) //renderBeers
}

function renderBeers(beers){
    beers.forEach(function(beer){
        createBeer(beer)
    })
}

function createBeer(beer){
    let grabBeerUl = document.getElementById('list-group')
    let createLi = document.createElement('li')
    createLi.className = "list-group-item"
    createLi.innerText = beer.name
    createLi.dataset.id = beer.id
    grabBeerUl.append(createLi)
}

function fetchSingleBeer(id){
    fetch(`http://localhost:3000/beers/${id}`)
        .then(resp => resp.json())
        .then(beer => renderShowBeer(beer)) //renderShowBeer
}

function renderShowBeer(beer){
    let grabBeerDiv = document.getElementById('beer-detail')
    grabBeerDiv.innerHTML = " "
    let createH1Element = document.createElement('h1')
    createH1Element.innerText = beer.name
    // createH1Element.dataset.id = beer.id

    let beerImg = document.createElement('img')
    beerImg.src = beer.image_url

    let createH3Element = document.createElement('h3')
    createH3Element.innerText = beer.tagline
    
    let createBeerDescription = document.createElement('textarea')
    createBeerDescription.innerText = beer.description

    let createBeerButton = document.createElement('button')
    createBeerButton.id = "edit-beer"
    createBeerButton.class = "btn btn-info"
    createBeerButton.innerText = 'Save'

    grabBeerDiv.append(createH1Element, beerImg, createH3Element, createBeerDescription, createBeerButton )
}

function clickBeer(){
    let grabBeerUl = document.getElementById('list-group')
    grabBeerUl.addEventListener('click', function(event){
        fetchSingleBeer(event.target.dataset.id)
    })
}

function patchComment(comment){
    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: comment
        })
    }
    fetch(`http://localhost:3000/beers/${id}`, configObj)
        .catch(error => console.log(error.message))

}

function addComment(){
    let grabData = document.getElementsByTagName('textarea')
    let commentValue = grabData.value
    
    patchComment(commentValue)
}

function commentListener(){
    let grabButton = document.getElementById('edit-beer')
    // debugger
    grabButton.addEventListener('submit', function(event){
        event.preventDefault();
        addComment(event)
    })
}


function main(){
    document.addEventListener("DOMContentLoaded", () => {
        fetchBeers();
        clickBeer();
        commentListener();
    })
}

main();