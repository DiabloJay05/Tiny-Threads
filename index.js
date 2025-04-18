import cart from "./cart.js";
import products from "./products.js";
let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

//load template file 
const loadTemplate = () => {
    fetch('/template.html')
    .then(response => response.text())
    .then(html => {
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        cart();
        initApp();
    })
}
loadTemplate();
const initApp = () => {
    // load product list
    console.log(products);
    let listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML = null;
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `
            <img src="${product.image}"/>
            <h2>${product.name}</h2>
            <div class="price">R${product.price}</div>
            <div id ="sizeCart"><button class="addCart"
                data-id="${product.id}">
                ADD TO CART
                </button>
                <select class="size">
            <option value = "option1">Size</option>
            <option value = "option2">7yr - 8yr</option>
            <option value = "option2">8yr - 9yr</option>
            <option value = "option2">9yr - 10yr</option>
            <option value = "option2">10yr - 11yr</option>
            <option value = "option2">11yr - 12yr</option>
            </div>
        `
        listProduct.appendChild(newProduct);
    })
}