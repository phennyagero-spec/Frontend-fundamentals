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
