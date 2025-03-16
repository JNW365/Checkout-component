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

fetch('https://dummyjson.com/products/1') 
    .then(res => res.json())
    .then(data => {
        productTitle.textContent = `${data.title}`;
        productDescription.textContent = `${data.description}`;
        productPrice.textContent = `$${data.price}`;
    })


// Incrementing Product Quantity

let quantity = document.getElementById('quantity');
quantity.value = 1;
let itemsInCart = document.getElementById('items-cart');


function increment() {
    quantity.value++;
    itemsInCart.textContent = quantity.value;
    
}
function decrement() {
    if(quantity.value > 1)
    quantity.value--;
    itemsInCart.textContent = quantity.value;
}




document.getElementById('add').addEventListener('click', increment);
document.getElementById('subtract').addEventListener('click', decrement)