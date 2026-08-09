function showCategory(category) {

    const categories = document.querySelectorAll('.menu-category');

    categories.forEach(function(section) {
        section.style.display = 'none';
    });

    const selectedCategory = document.getElementById(category);

    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
}

document.querySelectorAll(".view-btn").forEach(button => {

    button.addEventListener("click", function () {

        const details = this.nextElementSibling;

        if (details.style.display === "block") {
            details.style.display = "none";
            this.textContent = "View Details";
        } else {
            details.style.display = "block";
            this.textContent = "Hide Details";
        }

    });

});

/* ================= ORDER NOW -> adds dish to cart, goes to order.html ================= */

document.querySelectorAll(".order-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const card = this.closest(".menu-card");
        const name = card.querySelector("h4").textContent.trim();
        const priceText = card.querySelector("h5").textContent.trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);

        let cart = JSON.parse(localStorage.getItem("swahiliCart")) || [];
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name: name, price: price, qty: 1 });
        }

        localStorage.setItem("swahiliCart", JSON.stringify(cart));

        window.location.href = "order.html";

    });

});

showCategory('main');