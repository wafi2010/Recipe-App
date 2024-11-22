const SearchBtn = document.querySelector("#searchBtn");
const SearchBox = document.querySelector("#searchBox");
const ShowRecipe = document.querySelector(".recipe-container");
const recipeDitails = document.querySelector(".recipe-DitailsContent");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");
// Function to get recipe
const fetchRecipes = async (query) => {
    ShowRecipe.innerHTML = "<h2>Fetching Recipe...</h2>";  // Update loading text
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // Check if meals are returned
        if (!response.meals) {
            ShowRecipe.innerHTML = "No recipes found!";
            return;
        }
        // Clear previous results
        ShowRecipe.innerHTML = "";

        // Loop through the meals and display them
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Blongs to <span>${meal.strCategory}</span> Category</p>
            `;
            const btn = document.createElement('button');
            btn.textContent = "View Recipe";
            recipeDiv.appendChild(btn);

            //Adding EventListener to recipe
            btn.addEventListener('click',()=>{
                openRecipePopup(mail);
            })

            ShowRecipe.appendChild(recipeDiv);
        });
    } catch (error) {
        // Error handler
        ShowRecipe.innerHTML = "Failed to fetch recipes. Please try again later.";
        console.error(error);
    }
};
SearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if (searchInput) { 
        fetchRecipes(searchInput);
    } else {
      ShowRecipe.innerHTML = "Please enter a search term.";
    }
});
