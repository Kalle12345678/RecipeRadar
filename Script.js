const API_KEY = "23434457581a4f55b9c6bbd927715915";

async function fetchRecipes() {
    let ingredients = document.getElementById("ingredients").value.split(",").map(i => i.trim());
    if (ingredients.length === 0 || ingredients[0] === "") {
        alert("Ange minst en ingrediens!");
        return;
    }

    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&number=5&apiKey=${API_KEY}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        let list = document.getElementById("recipeList");
        list.innerHTML = "";

        data.forEach(recipe => {
            let li = document.createElement("li");
            
            let a = document.createElement("a");
            a.textContent = recipe.title;
            a.href = `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`;
            a.target = "_blank"; // Opens in a new tab
            a.style.textDecoration = ""; // Optional: Removes underline
            a.style.color = "Blue"; // Keeps default text color

            li.appendChild(a);
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Could not get recipes:", error);
        alert("Could not find recipe. Check API-Key.");
    }
}