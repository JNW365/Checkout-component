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
let counter = 2;

getProductData().then(data => {
    let myPrice = data.price * counter;
    productPrice.textContent = `$${myPrice}`;
})