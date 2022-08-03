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
        // .map() because we want a new array populated. Else, using forEach or for...of could be a another option.
        makeups.map(makeup => {
            const li = document.createElement('li'); // contains each product on the list
            li.innerHTML = // Using interpolation to add information to each li. I did it this way because it really shortens my codes tremendously. It took literally fourteen lines, instead of over thirty lines, I was able to display all the information needed for each product that gets rendered onto the page. I am not entirely confident in understanding the Big O Notation, but I do know that repetition is a big NO if codes can be abbreviated to save time and space.

            // For the star buttons, I decided to create five buttons and gave them all the class attribute of 'eachStar' incase I needed to grab those buttons or any reasons. Those stars are placed inside a div with the class attribute of 'star-btns.'
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
            // const starDiv = document.querySelector('.star-btns');
            // console.log(starDiv);

            // 
            const starBtn = document.querySelectorAll('.eachStar'); 
            // Placed all the stars into a variable called 'starBtn.' This variable represents each of the stars.
            // In order to iterate through all the stars, I used the forEach() method. For each star in starBtn, and [i] representing the index of which star that was clicked, I added a 'click' event listener to listen for a click. Once a click is detected, using console.log to check my work, I was able to see the index in which star was clicked.
            // currentStarLevel is set to i + 1 indicating that when index[0] was clicked, that will represent one star.
            // Now, for each star in starBtn and [j] representing the number of times a specific index was clicked, if the currentStarLevel is greater or equal to the number of times a star was clicked [j] + 1 then we want the star.innerHTML to be a filled in star. Otherwise we would want it to remain a unfilled star.
            // I used the if/else statement in order to activate or deactivate the stars.
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
            
            productList.append(li); // Here, I appended the (li) to the (ul) productList. 
        })
    }
    
})

//     const renderProducts = (makeups) => {
//         const productList = document.getElementById('product-list');
//         productList.innerHTML = '';
//         makeups.map(makeup => {
//         const li = document.createElement('li');
//         const productName = document.createElement('h3');
//         const productBrand = document.createElement('h5');
//         const productPrice = document.createElement('h5');
//         const productRating = document.createElement('h5');

//         const starDiv = document.createElement('div');
//         const star1 = document.createElement('button');
//         const star2 = document.createElement('button');
//         const star3 = document.createElement('button');
//         const star4 = document.createElement('button');
//         const star5 = document.createElement('button');
//         star1.classList.add('eachStar');
//         star2.classList.add('eachStar');
//         star3.classList.add('eachStar');
//         star4.classList.add('eachStar');
//         star5.classList.add('eachStar');
//         star1.innerText = inactiveStar;
//         star2.innerText = inactiveStar;
//         star3.innerText = inactiveStar;
//         star4.innerText = inactiveStar;
//         star5.innerText = inactiveStar;
//         starDiv.append(star1, star2, star3, star4, star5);

//         console.log(starDiv)

//         const productDescription = document.createElement('p');
//         const img = document.createElement('img');
//         productName.textContent = makeup.name;
//         productBrand.textContent = makeup.brand;
//         productPrice.textContent = `Price:${' $' + makeup.price}`;
//         productRating.textContent = `Rating:${' ' + makeup.rating}`;
//         productDescription.textContent = makeup.description;
//         img.src = makeup.image_link;
//         li.append(productName, productBrand, productPrice, productRating, starDiv, productDescription, img, document.createElement('hr'));
//         productList.append(li);
//     })
// }