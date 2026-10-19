"use strict";

const recipeList = document.querySelector("[data-meal-type]");
const mealType = recipeList.dataset.mealType;

const recipeUrl = `https://dummyjson.com/recipes/meal-type/${mealType}`;

function getData(url) {
  fetch(url).then((response) =>
    response.json().then((data) => showRecipes(data)),
  );

  function showRecipes(data) {
    recipeList.innerHTML = "";

    const filteredRecipes = data.recipes.filter((recipe) =>
      recipe.tags.includes("Asian"),
    );

    filteredRecipes.forEach((recipe) => {
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

      recipeList.innerHTML += `<article class="list_card">
          <div class="card_img">
            <img src="${recipe.image}" alt="${recipe.name}" />
          </div>
          <div class="card_info">  
          <h2 class="recipe_name">${recipe.name}</h2>
            <div class="recipe_details">
              <div class="info">
                <img src="/imgs/time.svg" alt="recipe duration" />
                <p>${totalTime} min.</p>
              </div>
              <div class="info">
                <img src="/imgs/rating.svg" alt="recipe rating" />
                <p>${recipe.rating}</p>
              </div>
              <div class="info">
                <img src="/imgs/servings.svg" alt="number of servings" />
                <p>${recipe.servings}</p>
              </div>
            </div>
            <div>
              <a class="btn" href="detailview.html?id=${recipe.id}">Recipe ➝</a>
            </div>
          </div>
        </article>`;
    });
  }
}

getData(recipeUrl);
