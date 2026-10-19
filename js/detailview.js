"use strict";

const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");

const detailURL = `https://dummyjson.com/recipes/${selectedID}`;

const descriptionList = document.querySelector(".recipe_description");
const ingredientsList = document.querySelector(".ingredients");
const instructionsList = document.querySelector(".instructions");

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(details) {
  descriptionList.innerHTML = "";

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

  ingredientsList.innerHTML = "";

  details.ingredients.forEach((ingredient) => {
    ingredientsList.innerHTML += `<li>
      <label>
        <input type="checkbox" />
        ${ingredient}
      </label>
    </li>`;
  });

  instructionsList.innerHTML = "";

  details.instructions.forEach((instruction) => {
    instructionsList.innerHTML += `<li>${instruction}</li>`;
  });
}

getData(detailURL);
