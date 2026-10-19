"use strict";

const form = document.querySelector("form");

const outputEmail = document.querySelector("#email_output");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  outputEmail.textContent = formData.get("email");

  form.reset();
}

form.addEventListener("submit", handleSubmit);

function cancelPopup(event) {
  event.preventDefault();
  form.querySelector(":user-invalid").focus();
}

form.addEventListener("invalid", cancelPopup, true);
