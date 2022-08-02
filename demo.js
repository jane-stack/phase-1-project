document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const activeStar = '★';
    const inactiveStar = '☆';
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevents the page from reseting
        
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${e.target[0].value}&product_type=${e.target[1].value}`)
        .then(response => response.json())
        .then(makeups => renderProducts(makeups))
        
        form.reset(); // resets the form
    });
    
    const renderProducts = (makeups) => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        makeups.map(makeup => {
        const li = document.createElement('li');
        const productName = document.createElement('h3');
        const productBrand = document.createElement('h5');
        const productPrice = document.createElement('h5');
        const productRating = document.createElement('h5');

        const starDiv = document.createElement('div');
        const star1 = document.createElement('button');
        const star2 = document.createElement('button');
        const star3 = document.createElement('button');
        const star4 = document.createElement('button');
        const star5 = document.createElement('button');
        star1.classList.add('eachStar');
        star2.classList.add('eachStar');
        star3.classList.add('eachStar');
        star4.classList.add('eachStar');
        star5.classList.add('eachStar');
        star1.innerText = inactiveStar;
        star2.innerText = inactiveStar;
        star3.innerText = inactiveStar;
        star4.innerText = inactiveStar;
        star5.innerText = inactiveStar;
        starDiv.append(star1, star2, star3, star4, star5);

        console.log(starDiv)

        const productDescription = document.createElement('p');
        const img = document.createElement('img');
        productName.textContent = makeup.name;
        productBrand.textContent = makeup.brand;
        productPrice.textContent = `Price:${' $' + makeup.price}`;
        productRating.textContent = `Rating:${' ' + makeup.rating}`;
        productDescription.textContent = makeup.description;
        img.src = makeup.image_link;
        li.append(productName, productBrand, productPrice, productRating, starDiv, productDescription, img, document.createElement('hr'));
        productList.append(li);
    })
}

form.reset();

})


// starBtn.forEach((star, i) => {
    //     star.addEventListener('click', () => {
        //         let currentStarLevel = i + 1;
        //         ratingStar.forEach((star, j) => {
            //             if (currentStarLevel >= j + 1) {
                //                 star.innerHTML = activeStar;
                //             } else {
                    //                 star.innerHTML = inactiveStar;
                    //             }
                    //         })
                    //     })
                    // })
                    