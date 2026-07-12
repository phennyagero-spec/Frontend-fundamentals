const button = document.getElementById("darkModeBtn");

button.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

});

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function(){

    const searchValue = searchBar.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card){

        const recipe = card.innerText.toLowerCase();

        if(recipe.includes(searchValue)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});

const likeButtons = document.querySelectorAll(".likeBtn");

likeButtons.forEach(function(button){

    button.addEventListener("click", function(){

        if(button.innerHTML === "❤️ Like"){
            button.innerHTML = "💖 Liked";
        }else{
            button.innerHTML = "❤️ Like";
        }

    });

});

const meals = [
    "🍛 Pilau",
    "🥟 Samosa",
    "🐟 Fried Fish",
    "🥭 Mango Juice",
    "🍖 Nyama Choma",
    "🥗 Fruit Salad",
    "🥖 Chapati",
    "🍩 Mandazi",
    "🍗 Fried Chicken, Ugali & Kachumbari"
];

const randomMeal = meals[Math.floor(Math.random() * meals.length)];

document.getElementById("mealName").textContent = randomMeal;

const popup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");

closePopup.addEventListener("click", function(){

    popup.style.display = "none";

});

// Form Validation

const recipeForm = document.getElementById("recipeForm");

recipeForm.addEventListener("submit", function(event){

    event.preventDefault();

    const userName = document.getElementById("userName").value.trim();
    const recipeTitle = document.getElementById("recipeTitle").value.trim();
    const recipeDescription = document.getElementById("recipeDescription").value.trim();

    const successMessage = document.getElementById("successMessage");

    if(userName === "" || recipeTitle === "" || recipeDescription === ""){

        successMessage.style.color = "red";
        successMessage.textContent = "⚠ Please fill in all the fields.";

    }else{

        successMessage.style.color = "green";
        successMessage.textContent =
        "🎉 Thank you! Your recipe has been submitted successfully.";

        recipeForm.reset();

    }

});