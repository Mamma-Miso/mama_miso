"use strict";

// Henter burger-menuen og navigationen fra HTML'en
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

// Tilføjer en click-event, der kalder funktionen burgerClick()
burger.addEventListener("click", burgerClick);

function burgerClick() {
  // Tilføjer eller fjerner klassen "active" på burger-menuen
  burger.classList.toggle("active");

  // Tilføjer eller fjerner klassen "active" på navigationen
  nav.classList.toggle("active");
}
