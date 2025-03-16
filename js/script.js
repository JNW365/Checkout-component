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

