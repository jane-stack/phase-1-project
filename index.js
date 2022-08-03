// The DOMContentLoaded event allows the HTML document to completely load without waiting for the stylesheets, images, and subframes to load first. 
document.addEventListener('DOMContentLoaded', () => {
    
    // These variables are placed here, in the Global Scope, so that it could be accessed from anywhere in the JavaScript program via the Scope Chain. 
    const form = document.getElementById('product-form');
    const activeStar = '★';
    const inactiveStar = '☆';

    form.addEventListener('submit', (e) => {
        // Here I am using a 'submit' event primarily used when a <form> is submitted.
        e.preventDefault(); // Prevents the form from reloading.
        // A form's defualt action is to reload, therefore preventDefault() is used to prevent an action that is otherwised handled in a specific way but may not be the best way to handle a particular situation. 
      
        // Fetch is the most efficient way to make a request to the server and update the DOM without reloading the webpage. This is a process refered to a AJAX (asynchronous JavaScript and XML).
        // Below is the base URL to the data source I am using for this project. Attached to the 'fetch()' request.
        // I am using a GET request which only requires the passing of the URL endpoint as an argument.
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${e.target[0].value}&product_type=${e.target[1].value}`)
        .then(response => response.json()) // converting the response from JSON.
        .then(makeups => renderProducts(makeups)) // The function renderProducts will take care of the DOM manipulation.
        
        form.reset(); // The .reset() method is used to clear all the values of the form elements.
    });
    
    // Here I am using an arrow function. Not too big of a deal but I was told that in React we would be using a lot of arrow functions so I decided to get some extra practice with using arrow functions. 
    const renderProducts = (makeups) => {
        const productList = document.getElementById('product-list');
        // getting access to the element with the id of product-list.
        // console.log(productList);
        productList.innerHTML = "";
        // productList.innerHTML = " ";
        // setting an empty string as innerHTML will remove all the children of the element.
        
        // Using .map() to create a new array populated from the entry provided in the form.
        // .map() because we want a new array populated. Else, using forEach or for...of could be a better option.
        makeups.map(makeup => {
            const li = document.createElement('li'); // contains each product on the list
            li.innerHTML = // Using interpolation to 
            ` 
            <h3>${makeup.name}</h3>
            <h5>${makeup.brand}</h5>
            <h5>Price: ${makeup.price}</h5>
            <h5>Rating: ${makeup.rating}</h5>
            <div class="star-btns">
                <button class ="eachStar">${inactiveStar}</button>
                <button class ="eachStar">${inactiveStar}</button>
                <button class ="eachStar">${inactiveStar}</button>
                <button class ="eachStar">${inactiveStar}</button>
                <button class ="eachStar">${inactiveStar}</button>
            </div>
            <p>${makeup.description}</p>
            <img src="${makeup.image_link}"></h3>
            <hr>
            `
            const starDiv = document.querySelector('.star-btns');
            console.log(starDiv);
            const starBtn = document.querySelectorAll('.eachStar');
            starBtn.forEach((star, i) => {
                star.addEventListener('click', () => {
                    console.log(`${i} clicked!`)
                    let currentStarLevel = i + 1;
                    starBtn.forEach((star, j) => {
                        if (currentStarLevel >= j + 1) {
                            star.innerHTML = activeStar;
                        } else {
                            star.innerHTML = inactiveStar;
                        }
                    })
                })
            })
            
            productList.append(li);
        })
    }
    
})