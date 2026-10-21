"use strict";

// Finder popup-overlayet, lukkeknappen og selve popup-vinduet i HTML'en
const popupOverlay = document.querySelector(".popup_overlay");
const closeButton = document.querySelector(".popup_close");
const popup = document.querySelector(".popup");

// Venter 2 sekunder, før popup-vinduet vises
setTimeout(() => {
  // Ændrer overlayets display til flex, så popup-vinduet bliver synligt
  popupOverlay.style.display = "flex";
}, 2000);

// Tilføjer en click-event til lukkeknappen
// Når brugeren klikker på knappen, kaldes funktionen closePopup()
closeButton.addEventListener("click", closePopup);

// Tilføjer en click-event til overlayet omkring popup-vinduet
popupOverlay.addEventListener("click", (event) => {
  // Undersøger, om brugeren har klikket uden for selve popup-vinduet
  if (!popup.contains(event.target)) {
    // Lukker popup-vinduet, hvis der er klikket uden for det
    closePopup();
  }
});

// Funktion, der lukker popup-vinduet
function closePopup() {
  // Skjuler overlayet og popup-vinduet ved at sætte display til none
  popupOverlay.style.display = "none";
}
