// Add custom JavaScript here

// Triggering Toast

const toastTrigger = document.getElementById('place-order');
const toast = document.getElementById('confirmation');

if(toastTrigger) {
    const confirmToast = bootstrap.Toast.getOrCreateInstance(toast);
    toastTrigger.addEventListener('click', () => {
        confirmToast.show();
    })
}

// **Products in Cart**

// get data for product card from api
let productTitle = document.getElementById('title');
let productDescription = document.getElementById('description');
let productPrice = document.getElementById('item-price');

function getProductData() {
    return fetch('https://dummyjson.com/products/1')
        .then(res => res.json());
}

getProductData().then(data => {
    productTitle.textContent = data.title;
    productDescription.textContent = data.description;
    // productPrice.textContent = `$${data.price}`;
});


// Incrementing Product Quantity
const quantity = document.getElementById('quantity');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const itemsInCart = document.getElementById('items-cart');
const itemTotal = document.getElementById('item-price');

let productData = null;

getProductData().then(data => {
    productData = data;
    updatePrice();  
});

function updatePrice() {
    if (productData) {
        let myPrice = productData.price * parseInt(quantity.value, 10);
        productPrice.textContent = `$${myPrice.toFixed(2)}`;
        document.getElementById('totalInCart').innerHTML = `$${myPrice}`;
    } 
}


addBtn.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value, 10) + 1;
    itemsInCart.textContent = quantity.value;
    updatePrice();
});

subtractBtn.addEventListener('click', () => {
    if (parseInt(quantity.value, 10) > 1) {
        quantity.value = parseInt(quantity.value, 10) - 1;
        itemsInCart.textContent = quantity.value;
        updatePrice();
    }
});






