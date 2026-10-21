"use strict";

// Henter parameteren "id" fra URL'en
// så vi kan finde den opskrift, brugeren har valgt
const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");

// Opretter URL'en til den valgte opskrift i DummyJSON API'et
const detailURL = `https://dummyjson.com/recipes/${selectedID}`;

// Finder HTML-elementerne, hvor opskriftens informationer skal vises
const descriptionList = document.querySelector(".recipe_description");
const ingredientsList = document.querySelector(".ingredients");
const instructionsList = document.querySelector(".instructions");

// Funktion, der henter data fra API'et
function getData(url) {
  fetch(url).then((response) => {
    // Konverterer svaret fra API'et til JSON-format
    response.json().then((data) => {
      // Sender dataene videre til funktionen, der viser opskriften
      showDetails(data);
    });
  });
}

// Funktion, der viser opskriftens informationer på hjemmesiden
function showDetails(details) {
  // Tømmer elementet, inden nyt indhold indsættes
  descriptionList.innerHTML = "";

  // Indsætter opskriftens navn, billede og informationer dynamisk
  // ved hjælp af template literals og data fra API'et
  descriptionList.innerHTML += `<h1>${details.name}</h1>
    <img
      src="${details.image}"
      alt="${details.name}"
    />
    <ul id="layout" class="description">
      <li><b>Prep time:</b> ${details.prepTimeMinutes}</li>
      <li><b>Cook time:</b> ${details.cookTimeMinutes}</li>
      <li><b>Servings:</b> ${details.servings}</li>
      <li><b>Difficulty:</b> ${details.difficulty}</li>
      <li><b>Cuisine:</b> ${details.cuisine}</li>
      <li><b>Calories pr. serving:</b> ${details.caloriesPerServing}</li>
    </ul>`;

  // Tømmer ingredienslisten, inden ingredienserne indsættes
  ingredientsList.innerHTML = "";

  // Gennemgår alle ingredienserne fra API'et
  details.ingredients.forEach((ingredient) => {
    // Opretter et listeelement med en afkrydsningsboks
    // så brugeren kan krydse ingredienser af under madlavningen
    ingredientsList.innerHTML += `<li>
      <label>
        <input type="checkbox" />
        ${ingredient}
      </label>
    </li>`;
  });

  // Tømmer instruktionslisten, inden instruktionerne indsættes
  instructionsList.innerHTML = "";

  // Gennemgår alle instruktionerne fra API'et
  // og indsætter hver instruktion som et listeelement
  details.instructions.forEach((instruction) => {
    instructionsList.innerHTML += `<li>${instruction}</li>`;
  });
}

// Kalder funktionen med URL'en til den valgte opskrift
// så datahentningen starter, når JavaScript-filen indlæses
getData(detailURL);
