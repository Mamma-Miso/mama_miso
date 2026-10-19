"use strict";

const popupOverlay = document.querySelector(".popup_overlay");
const closeButton = document.querySelector(".popup_close");
const popup = document.querySelector(".popup");

closeButton.addEventListener("click", closePopup);

popupOverlay.addEventListener("click", (event) => {
  if (!popup.contains(event.target)) {
    closePopup();
  }
});

function closePopup() {
  popupOverlay.style.display = "none";
}
