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

// Get data for product card from API
let productTitle = document.getElementById('title');
let productDescription = document.getElementById('description');
let productPrice = document.getElementById('item-price');

async function getProductData() {
    let response = await fetch('https://dummyjson.com/products/1');
    return response.json();
}

let productData = null;

getProductData().then(data => {
    productData = data;
    productTitle.textContent = data.title;
    productDescription.textContent = data.description;
    productPrice.textContent = `$${data.price}`;
    updateOrderTotal();  // Ensure the total is calculated when data loads
});

// Elements for quantity update
const quantity = document.getElementById('quantity');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const itemsInCart = document.getElementById('items-cart');

// Elements for order total
const totalInCart = document.getElementById('totalInCart');
const subtotal = document.getElementById('subtotal');
const shippingCostElement = document.getElementById('shippingTotal');
const orderTotal = document.getElementById('orderTotal');

// Shipping method selection
let shippingMethods = document.querySelectorAll('input[name="radio-shipping"]');

// Function to calculate and update the total price
function updateOrderTotal() {
    if (!productData) return;

    // Calculate item subtotal
    let itemSubtotal = productData.price * parseInt(quantity.value, 10);

    // Get the selected shipping cost
    let selectedShipping = document.querySelector('input[name="radio-shipping"]:checked');
    let shippingCost = selectedShipping ? parseFloat(selectedShipping.value) : 0;

    // Calculate final order total
    let finalTotal = itemSubtotal + shippingCost;

    // Update UI
    totalInCart.textContent = `$${itemSubtotal.toFixed(2)}`;
    subtotal.textContent = `$${itemSubtotal.toFixed(2)}`;
    shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
    orderTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

// Event listeners for quantity buttons
addBtn.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value, 10) + 1;
    itemsInCart.textContent = quantity.value;
    updateOrderTotal();
});

subtractBtn.addEventListener('click', () => {
    if (parseInt(quantity.value, 10) > 1) {
        quantity.value = parseInt(quantity.value, 10) - 1;
        itemsInCart.textContent = quantity.value;
        updateOrderTotal();
    }
});

// Event listener for shipping method change
shippingMethods.forEach(shippingMethod => {
    shippingMethod.addEventListener('change', updateOrderTotal);
});

// Ensure order total updates on page load
updateOrderTotal();


// Form Validation
(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
  
          // Auto-open the accordion section that has the first error
          const firstInvalid = form.querySelector(':invalid');
          const collapse = firstInvalid.closest('.accordion-collapse');
          if (collapse && !collapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
            bsCollapse.show();
          }
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  
