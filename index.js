document.addEventListener('DOMContentLoaded', () => {
    renderHomepage();
    getProducts();
})

// NODE GETTER
const mainDiv = () => document.getElementById('main');

// EventListeners


// EventHandlers


function renderHomepage() {
    resetMainDiv();
    const p = document.createElement('p');
    p.innerText = "Please take a look at my Phase-1 Project! I am creating an application that will allow it's users to search specific makeup brands and products. User's would also be able to give the product a star rating and leave a comment regarding their thoughts on that particular products.";
    mainDiv().appendChild(p);
}

function getProducts() {
    const baseURL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })

}

// Helpers
function resetMainDiv() {
    mainDiv().innerHTML = "";
}