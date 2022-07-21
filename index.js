
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${e.target[0].value}&product_type=${e.target[1].value}`)
            .then(response => response.json())
            .then(makeups => {
                const productList = document.getElementById('product-list')
                const starSymbol = '☆'
                const stars = document.querySelectorAll('.star')
                
                productList.innerHTML = ''
                makeups.map(makeup => {
                    const li = document.createElement('li')
                    const productName = document.createElement('h3')
                    const productRating = document.createElement('h5')
                    const productBrand = document.createElement('h5')
                    const productPrice = document.createElement('h5')
                    const productDescription = document.createElement('p')
                    productName.textContent = makeup.name
                    productBrand.textContent = makeup.brand
                    productPrice.textContent = `Price:${' $' +makeup.price}`
                    productRating.textContent = `Rating:${' ' + makeup.rating}`
                    
                    const starBtn = document.createElement('span')
                    starBtn.innerHTML =
                    `
                    <div class="star">${starSymbol}</div>
                    <div class="star">${starSymbol}</div>
                    <div class="star">${starSymbol}</div>
                    <div class="star">${starSymbol}</div>
                    <div class="star">${starSymbol}</div>
                    `

                    productDescription.textContent = makeup.description
                    const img = document.createElement('img')
                    img.src = makeup.image_link

                    li.append(productName, productBrand, productPrice, productRating, starBtn, productDescription, img, document.createElement('hr'))
                    productList.append(li)
                })
            })
            form.reset()
        })
})