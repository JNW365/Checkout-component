// Add custom JavaScript here

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
    document.getElementById('orderTot').textContent = `$${finalTotal}`;
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
            console.log('form not complete')
          // Auto-open the accordion section that has the first error
          const firstInvalid = form.querySelector(':invalid');
          const collapse = firstInvalid.closest('.accordion-collapse');
          if (collapse && !collapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
            bsCollapse.show();
          }
        } else {
          //  Prevent default submission even if valid
          event.preventDefault();
          let processing = document.getElementById('processing');
          processing.classList.remove('d-none');
          document.getElementById('place-order').classList.add('d-none');
          
          setTimeout(() => {
            const toast = document.getElementById('confirmation');
            const confirmToast = bootstrap.Toast.getOrCreateInstance(toast);
            processing.classList.add('d-none');
          document.getElementById('place-order').classList.remove('d-none');
            confirmToast.show();


            console.log('form complete')
          }, 2000)
          
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  
  // Functions for toast

  const orderNumber = document.getElementById('orderNum');
  orderNumber.textContent = "LB-" + `${Math.floor(1000 + Math.random() * 9)}`;

  const orderDate = document.getElementById('orderDate');
  let date = new Date();
  orderDate.textContent = date.toDateString();
  

  // Choose shipping address and add to toast
  document.addEventListener('DOMContentLoaded', () => {
    const shippingAddresses = document.querySelectorAll('input[name="radio-address"]');
    const cardOnFile = document.querySelectorAll('input[name="radio-card"]');

  shippingAddresses.forEach((address) => {
    address.addEventListener('change', (event) => {
      if(event.target.id === 'radio-address-one') {
        document.querySelector('.address-ship').innerHTML = '<p>Joanie Graydon<br>6587 Wilma Path<br>Cameronberk, KY 56876</p>';
        
      } else if (event.target.id === 'radio-address-two') {
        document.querySelector('.address-ship').innerHTML = '<p>Joanie Graydon<br>5610 Schowalter Terrace<br>West Glen, KY 56888</p>';
        
      }
    })
  })
  // Choose shipping method and add to toast
     shippingMethods.forEach((method) => {
      method.addEventListener('change', (event) => {
        if(event.target.id === "radio-shipping-one") {
          document.getElementById('shipMeth').innerHTML = '<p><i class="fa-brands fa-usps me-2"></i>USPS Priority Mail $9.99</p>';
        } else if(event.target.id === "radio-shipping-two") {
          document.getElementById('shipMeth').innerHTML = '<p><i class="fa-brands fa-ups me-2"></i>UPS Ground $15.49</p>';
        } else if (event.target.id === "radio-shipping-three") {
          document.getElementById('shipMeth').innerHTML = '<p><i class="fa-brands fa-ups me-2"></i>UPS Next Day $24.95</p>';
        }
      })
     })

    // Add card info to form and add to toast 
    cardOnFile.forEach((card) => {
      card.addEventListener('change', (event) => {
        if(event.target.id === 'card1') {
          document.getElementById('cardholder-name').value = 'Joanie Graydon';
          document.getElementById('card-number').value = `${"4889-1252-0221-2273"}`;
          document.getElementById('exp').value = `${"08/29"}`;
          document.getElementById('cvv').value = 823;
          document.getElementById('paymentMeth').innerHTML = '<i class="fa-brands fa-cc-visa mx-2"></i>ending 2273'
        } else if (event.target.id === 'card2') {
          document.getElementById('cardholder-name').value = 'Joanie Graydon';
          document.getElementById('card-number').value = `${"5178-3530-5184-4247"}`;
          document.getElementById('exp').value = `${"11/29"}`;
          document.getElementById('cvv').value = 256;
          document.getElementById('paymentMeth').innerHTML = '<i class="fa-brands fa-cc-mastercard mx-2"></i>ending 4247'
        }
      })
    })

  });

  


  
// clear form after toast close
const toastEl = document.getElementById('confirmation');
const form = document.getElementById('checkout-form');

toastEl.addEventListener('hidden.bs.toast', () => {
  form.reset();
  form.classList.remove('was-validated');
});

