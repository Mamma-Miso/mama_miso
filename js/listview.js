"use strict";

const lunchUrl = `https://dummyjson.com/recipes/meal-type/lunch`;
const lunchList = document.querySelector(".lunch_list_container");

function getData(url) {
  fetch(url).then((response) =>
    response.json().then((data) => showRecipes(data)),
  );

  function showRecipes(data) {
    lunchList.innerHTML = "";

    const filteredRecipes = data.recipes.filter((recipe) =>
      recipe.tags.includes("Asian"),
    );

    filteredRecipes.forEach((recipe) => {
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

      lunchList.innerHTML += `<article class="list_card">
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

getData(lunchUrl);
