"use strict";

// Finder HTML-elementet, hvor opskrifterne skal vises
const recipeList = document.querySelector("[data-meal-type]");

// Henter måltidstypen fra HTML-elementets data-attribut
// fx "lunch", "dinner", "dessert" eller "beverage"
const mealType = recipeList.dataset.mealType;

// Opretter API-URL'en ud fra måltidstypen og henter op til 50 opskrifter
const recipeUrl = `https://dummyjson.com/recipes/meal-type/${mealType}?limit=50`;

// Gemmer opskrifterne fra API'et efter filtrering af tags
let allData = [];

// Gemmer de aktuelt valgte filtre og sorteringsindstillinger
let selectedDifficulty = "All";
let selectedServings = "All";
let selectedRating = "Not filtered";

// Funktion, der henter opskrifter fra API'et
function getData(url) {
  fetch(url)
    // Konverterer API-svaret til JSON-format
    .then((response) => response.json())
    .then((data) => {
      // Filtrerer opskrifterne, så kun opskrifter med
      // bestemte asiatiske tags gemmes i allData
      allData = data.recipes.filter(
        (recipe) =>
          recipe.tags.includes("Asian") ||
          recipe.tags.includes("Japanese") ||
          recipe.tags.includes("Thai") ||
          recipe.tags.includes("Vietnamese") ||
          recipe.tags.includes("Pakistani"),
      );

      // Anvender de valgte filtre og sorteringsindstillinger
      applyFilters();
    });
}

// Funktion, der filtrerer og sorterer opskrifterne
function applyFilters() {
  // Opretter en kopi af opskrifterne, så den oprindelige liste bevares
  let filteredRecipes = [...allData];

  // Difficulty-filter: viser kun opskrifter med den valgte sværhedsgrad
  // hvis brugeren ikke har valgt "All"
  if (selectedDifficulty !== "All") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.difficulty === selectedDifficulty,
    );
  }

  // Servings-filter: viser kun opskrifter med det valgte antal portioner
  // Number() omdanner værdien fra HTML til et tal
  if (selectedServings !== "All") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.servings === Number(selectedServings),
    );
  }

  // Rating-sortering: sorterer efter bedømmelse fra højeste til laveste
  // eller fra laveste til højeste afhængigt af brugerens valg
  if (selectedRating === "High to low") {
    filteredRecipes.sort((a, b) => b.rating - a.rating);
  } else if (selectedRating === "Low to high") {
    filteredRecipes.sort((a, b) => a.rating - b.rating);
  }

  // Sender den filtrerede og sorterede liste videre til visning
  showRecipes(filteredRecipes);
}

// Funktion, der viser opskrifterne på hjemmesiden
function showRecipes(recipes) {
  // Tømmer opskriftslisten, så kortene ikke bliver gentaget
  recipeList.innerHTML = "";

  // Gennemgår hver opskrift i den filtrerede liste
  recipes.forEach((recipe) => {
    // Beregner den samlede tilberedningstid i minutter
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    // Opretter et opskriftskort med data fra API'et
    // Template literals indsætter opskriftens værdier i HTML'en
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
            <!-- Linker til detailview og sender opskriftens ID med i URL'en -->
            <a class="btn" href="detailview.html?id=${recipe.id}">
              Recipe ➝
            </a>
          </div>
        </div>
      </article>
    `;
  });
}

// Finder alle knapper, der bruges til at filtrere efter sværhedsgrad
const difficultyBtns = document.querySelectorAll(
  ".filter_difficulty button[data-difficulty]",
);

// Tilføjer en click-event til hver sværhedsgradsknap
difficultyBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Gemmer den valgte sværhedsgrad fra knappens data-attribut
    selectedDifficulty = button.dataset.difficulty;

    // Fjerner markeringen fra alle knapper
    difficultyBtns.forEach((btn) => btn.classList.remove("selected"));

    // Markerer den knap, brugeren har klikket på
    button.classList.add("selected");

    // Opdaterer opskriftslisten med det valgte filter
    applyFilters();
  });
});

// Finder alle knapper, der bruges til at filtrere efter antal portioner
const servingsBtns = document.querySelectorAll(
  ".filter_servings button[data-servings]",
);

// Tilføjer en click-event til hver portionsknap
servingsBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Gemmer det valgte antal portioner fra knappens data-attribut
    selectedServings = button.dataset.servings;

    // Fjerner markeringen fra alle portionsknapper
    servingsBtns.forEach((btn) => btn.classList.remove("selected"));

    // Markerer den valgte portionsknap
    button.classList.add("selected");

    // Opdaterer opskriftslisten med de valgte filtre
    applyFilters();
  });
});

// Finder knapperne til sortering efter bedømmelse
const ratingBtns = document.querySelectorAll(".filter_rating button");

// Tilføjer en click-event til hver sorteringsknap
ratingBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Undersøger knappens CSS-klasse for at afgøre sorteringsretningen
    if (button.classList.contains("htol")) {
      selectedRating = "High to low";
    } else if (button.classList.contains("ltoh")) {
      selectedRating = "Low to high";
    } else {
      // Hvis ingen af sorteringsretningerne er valgt,
      // nulstilles sorteringen
      selectedRating = "All";
    }

    // Fjerner markeringen fra alle sorteringsknapper
    ratingBtns.forEach((btn) => btn.classList.remove("selected"));

    // Markerer den valgte sorteringsknap
    button.classList.add("selected");

    // Opdaterer opskriftslisten med den nye sortering
    applyFilters();
  });
});

// Starter datahentningen ved at kalde funktionen med API-URL'en
getData(recipeUrl);
