"use strict";

const lunchUrl = `https://dummyjson.com/recipes/meal-type/lunch`;
const lunchList = document.querySelector(".lunch_list_container");

function getData(url) {
  fetch(url).then((response) =>
    response.json().then((data) => showRecipes(data)),
  );

  function showRecipes(recipes) {
    lunchList.innerHTML = "";

    recipes.forEach((recipe) => {
      lunchList.innerHTML += ``;
    });
  }
}

getData(lunchUrl);
