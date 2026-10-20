"use strict";

const recipeList = document.querySelector("[data-meal-type]");
const mealType = recipeList.dataset.mealType;

const recipeUrl = `https://dummyjson.com/recipes/meal-type/${mealType}?limit=50`;

// Gemmer opskrifterne fra API'en
let allData = [];

// Gemmer de valgte filtre
let selectedDifficulty = "All";
let selectedServings = "All";
let selectedRating = "Not filtered";

// Hent opskrifter
function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allData = data.recipes.filter(
        (recipe) =>
          recipe.tags.includes("Asian") ||
          recipe.tags.includes("Japanese") ||
          recipe.tags.includes("Thai") ||
          recipe.tags.includes("Vietnamese"),
      );

      applyFilters();
    });
}

// Filtrér og sortér opskrifterne
function applyFilters() {
  let filteredRecipes = [...allData];

  // Difficulty-filter
  if (selectedDifficulty !== "All") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.difficulty === selectedDifficulty,
    );
  }

  // Servings-filter
  if (selectedServings !== "All") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.servings === Number(selectedServings),
    );
  }

  // Rating-sortering
  if (selectedRating === "High to low") {
    filteredRecipes.sort((a, b) => b.rating - a.rating);
  } else if (selectedRating === "Low to high") {
    filteredRecipes.sort((a, b) => a.rating - b.rating);
  }

  showRecipes(filteredRecipes);
}

// Vis opskrifter
function showRecipes(recipes) {
  recipeList.innerHTML = "";

  recipes.forEach((recipe) => {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    recipeList.innerHTML += `
      <article class="list_card">
        <div class="card_img">
          <img src="${recipe.image}" alt="${recipe.name}" />
        </div>

        <div class="card_info">
          <h2 class="recipe_name">${recipe.name}</h2>

          <div class="recipe_details">
            <div class="info">
              <img src="imgs/time.svg" alt="Recipe duration" />
              <p>${totalTime} min.</p>
            </div>

            <div class="info">
              <img src="imgs/rating.svg" alt="Recipe rating" />
              <p>${recipe.rating}</p>
            </div>

            <div class="info">
              <img src="imgs/servings.svg" alt="Number of servings" />
              <p>${recipe.servings}</p>
            </div>
          </div>

          <div>
            <a class="btn" href="detailview.html?id=${recipe.id}">
              Recipe ➝
            </a>
          </div>
        </div>
      </article>
    `;
  });
}

// Difficulty-knapper
const difficultyBtns = document.querySelectorAll(
  ".filter_difficulty button[data-difficulty]",
);

difficultyBtns.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDifficulty = button.dataset.difficulty;

    difficultyBtns.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    applyFilters();
  });
});

// Servings-knapper
const servingsBtns = document.querySelectorAll(
  ".filter_servings button[data-servings]",
);

servingsBtns.forEach((button) => {
  button.addEventListener("click", () => {
    selectedServings = button.dataset.servings;

    servingsBtns.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    applyFilters();
  });
});

// Rating-knapper
const ratingBtns = document.querySelectorAll(".filter_rating button");

ratingBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("htol")) {
      selectedRating = "High to low";
    } else if (button.classList.contains("ltoh")) {
      selectedRating = "Low to high";
    } else {
      selectedRating = "All";
    }

    ratingBtns.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    applyFilters();
  });
});

// Start
getData(recipeUrl);
