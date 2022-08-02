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
        console.log(productList);
        productList.innerHTML = '';
        makeups.map(makeup => {
            const li = document.createElement('li'); // contains each product on the list
            li.innerHTML = 
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