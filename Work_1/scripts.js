// Update the clock every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    document.getElementById("hour").textContent = hours;
    document.getElementById("minute").textContent = minutes;
    document.getElementById("second").textContent = seconds;
}

setInterval(updateClock, 1000); // Update clock every second

// Activate products in a loop every 5 seconds
const products = document.querySelectorAll('.product-item');
let currentIndex = 0;

setInterval(() => {
    // Remove 'active' class from all products
    products.forEach(product => {
        product.classList.remove('active');
    });

    // Add 'active' class to the current product item
    products[currentIndex].classList.add('active');

    // Move to the next product
    currentIndex = (currentIndex + 1) % products.length;
}, 5000); // Change product every 5 seconds

// Add event listener to the menu icon
document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});
