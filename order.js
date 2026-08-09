/* ==============================
   MENU DATA (for "add another dish")
   Keep these names/prices in sync with index.html
   ============================== */

const MENU = {
    "Main Dishes": [
        { name: "Biryani", price: 850 },
        { name: "Swahili Pilau", price: 700 },
        { name: "Wali wa Nazi", price: 650 },
        { name: "Fried Fish", price: 950 },
        { name: "Grilled Hen", price: 1100 },
        { name: "Pork Ribs", price: 1200 },
        { name: "Chicken Burger", price: 800 },
        { name: "Creamy Pasta", price: 750 },
        { name: "Buttery Mashed Potatoes", price: 650 },
        { name: "Sautéed Mushrooms", price: 600 },
        { name: "Crispy Breaded Chicken", price: 900 },
        { name: "Baked Beans", price: 500 },
        { name: "Beef Mishkaki", price: 950 }
    ],
    "Snacks": [
        { name: "Potato Bhajia", price: 250 },
        { name: "Soft Chapati", price: 50 },
        { name: "Swahili Mahamri", price: 80 },
        { name: "Samosa Roll", price: 150 },
        { name: "Potato Wedges", price: 300 },
        { name: "Plain Fries", price: 200 },
        { name: "Pizza", price: 800 },
        { name: "Masala Fries", price: 350 },
        { name: "Vegetable Samosa", price: 100 }
    ],
    "Drinks": [
        { name: "Fresh Mango Juice", price: 200 },
        { name: "Pineapple Ginger Juice", price: 250 },
        { name: "Fresh Coconut Juice", price: 300 },
        { name: "Iced Hibiscus Tea", price: 250 },
        { name: "Swahili Masala Tea", price: 150 },
        { name: "Fresh Passion Juice", price: 200 },
        { name: "Tropical Cocktail", price: 450 },
        { name: "Fresh Lime Juice", price: 180 },
        { name: "Fresh Ginger Juice", price: 220 }
    ],
    "Desserts": [
        { name: "Rainbow Ice Cream", price: 350 },
        { name: "Cheese Biscuits", price: 200 },
        { name: "Cheese Cake", price: 500 },
        { name: "Vanilla Ice Cream", price: 600 },
        { name: "Caramel Cake", price: 700 },
        { name: "Fruit Salad", price: 300 }
    ]
};

const CART_KEY = "swahiliCart";


/* ---------- cart helpers ---------- */

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}


/* ---------- rendering ---------- */

function renderTicket() {
    const cart = getCart();
    const itemsEl = document.getElementById("ticketItems");
    const emptyEl = document.getElementById("ticketEmpty");

    itemsEl.innerHTML = "";

    if (cart.length === 0) {
        emptyEl.style.display = "block";
    } else {
        emptyEl.style.display = "none";

        cart.forEach(item => {
            const row = document.createElement("div");
            row.className = "ticket-row";
            row.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">Ksh ${item.price * item.qty}</span>
                <div class="qty-control">
                    <button type="button" class="qty-minus" data-name="${item.name}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button type="button" class="qty-plus" data-name="${item.name}">+</button>
                    <button type="button" class="remove-item" data-name="${item.name}" title="Remove">✕</button>
                </div>
            `;
            itemsEl.appendChild(row);
        });
    }

    const total = cartTotal(cart);
    document.getElementById("ticketTotal").textContent = `Ksh ${total}`;
    document.getElementById("formTotal").textContent = `Ksh ${total}`;

    const confirmBtn = document.querySelector(".confirm-btn");
    confirmBtn.disabled = cart.length === 0;
}

function populateAddItemSelect() {
    const select = document.getElementById("addItemSelect");

    Object.keys(MENU).forEach(category => {
        const group = document.createElement("optgroup");
        group.label = category;

        MENU[category].forEach(dish => {
            const opt = document.createElement("option");
            opt.value = `${dish.name}|${dish.price}`;
            opt.textContent = `${dish.name} — Ksh ${dish.price}`;
            group.appendChild(opt);
        });

        select.appendChild(group);
    });
}


/* ---------- cart mutation ---------- */

function changeQty(name, delta) {
    let cart = getCart();
    const item = cart.find(i => i.name === name);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
    }

    saveCart(cart);
    renderTicket();
}

function removeItem(name) {
    const cart = getCart().filter(i => i.name !== name);
    saveCart(cart);
    renderTicket();
}

function addItemFromSelect() {
    const select = document.getElementById("addItemSelect");
    const value = select.value;
    if (!value) return;

    const [name, priceStr] = value.split("|");
    const price = parseInt(priceStr, 10);

    const cart = getCart();
    const existing = cart.find(i => i.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart(cart);
    renderTicket();
    select.value = "";
}


/* ---------- form behaviour ---------- */

function setupOrderTypeToggle() {
    const orderType = document.getElementById("orderType");
    const addressField = document.getElementById("addressField");
    const tableField = document.getElementById("tableNumber");

    function update() {
        if (orderType.value === "delivery") {
            addressField.style.display = "block";
            addressField.required = true;
            tableField.style.display = "none";
            tableField.required = false;
        } else if (orderType.value === "dinein") {
            addressField.style.display = "none";
            addressField.required = false;
            tableField.style.display = "block";
            tableField.required = true;
        } else {
            addressField.style.display = "none";
            addressField.required = false;
            tableField.style.display = "none";
            tableField.required = false;
        }
    }

    orderType.addEventListener("change", update);
    update();
}


/* ---------- fake confirm flow ---------- */

function handleConfirm(e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) return;

    const fullName = document.getElementById("fullName").value.trim();
    if (!fullName || !document.getElementById("phone").value.trim()) return;

    const loadingOverlay = document.getElementById("loadingOverlay");
    const successOverlay = document.getElementById("successOverlay");
    const successMsg = document.getElementById("successMsg");

    loadingOverlay.classList.add("show");

    setTimeout(() => {
        loadingOverlay.classList.remove("show");

        const orderNumber = Math.floor(1000 + Math.random() * 9000);
        successMsg.textContent = `Thank you, ${fullName}! Order #${orderNumber} has been placed and Ksh ${cartTotal(cart)} is confirmed.`;

        successOverlay.classList.add("show");

        setTimeout(() => {
            localStorage.removeItem(CART_KEY);
            window.location.href = "index.html";
        }, 2800);

    }, 1900);
}


/* ---------- init ---------- */

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ticketDate").textContent =
        new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

    populateAddItemSelect();
    renderTicket();
    setupOrderTypeToggle();

    document.getElementById("addItemBtn").addEventListener("click", addItemFromSelect);

    document.getElementById("ticketItems").addEventListener("click", (e) => {
        const name = e.target.dataset.name;
        if (!name) return;

        if (e.target.classList.contains("qty-plus")) changeQty(name, 1);
        if (e.target.classList.contains("qty-minus")) changeQty(name, -1);
        if (e.target.classList.contains("remove-item")) removeItem(name);
    });

    document.getElementById("orderForm").addEventListener("submit", handleConfirm);
});