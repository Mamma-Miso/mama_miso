"use strict";

console.log("1. CATEGORYLIST JS VIRKER!");

const productUrl = "https://dummyjson.com/recipes?limit=50";
const catList = document.querySelector(".grid_categories");

console.log("2. catList:", catList);

getData();

function getData() {
  console.log("3. Vi forsøger at hente data fra API'et");

  fetch(productUrl)
    .then((result) => {
      console.log("4. API-status:", result.status);
      return result.json();
    })
    .then((data) => {
      console.log("5. Data fra API:", data);
      showData(data);
    })
    .catch((error) => {
      console.log("FEJL:", error);
    });
}
function showData(data) {
  const recipes = data.recipes;

  // Filtrerer asiatiske opskrifter
  const asianRecipes = recipes.filter((recipe) => {
    return (
      recipe.tags.includes("Asian") ||
      recipe.tags.includes("Japanese") ||
      recipe.tags.includes("Korean") ||
      recipe.tags.includes("Thai") ||
      recipe.tags.includes("Chinese") ||
      recipe.tags.includes("Vietnamese")
    );
  });

  // Filtrerer opskrifter efter kategori
  const lunchRecipes = asianRecipes.filter((recipe) =>
    recipe.mealType.includes("Lunch"),
  );

  const dinnerRecipes = asianRecipes.filter((recipe) =>
    recipe.mealType.includes("Dinner"),
  );

  const dessertRecipes = asianRecipes.filter((recipe) =>
    recipe.mealType.includes("Dessert"),
  );

  const beverageRecipes = asianRecipes.filter((recipe) =>
    recipe.mealType.includes("Beverage"),
  );

  console.log("Asiatiske opskrifter:", asianRecipes.length);
  console.log("Lunch:", lunchRecipes.length);
  console.log("Dinner:", dinnerRecipes.length);
  console.log("Dessert:", dessertRecipes.length);
  console.log("Beverage:", beverageRecipes.length);

  showCategories();
}

function showCategories() {
  const categories = [
    {
      name: "Lunch",
      className: "lunch_cat",
      linkClass: "lunch_card_link",
      ctaClass: "lunch_card_cta",
      link: "lunch.html",
      image: "imgs/caterories_menu_img.webp",
    },
    {
      name: "Dinner",
      className: "dinner_cat",
      linkClass: "dinner_card_link",
      ctaClass: "dinner_card_cta",
      link: "dinner.html",
      image: "imgs/caterories_menu_img.webp",
    },
    {
      name: "Dessert",
      className: "dessert_cat",
      linkClass: "dessert_card_link",
      ctaClass: "dessert_card_cta",
      link: "dessert.html",
      image: "imgs/caterories_menu_img.webp",
    },
    {
      name: "Beverage",
      className: "beverage_cat",
      linkClass: "beverage_card_link",
      ctaClass: "beverage_card_cta",
      link: "beverage.html",
      image: "imgs/caterories_menu_img.webp",
    },
  ];

  let myInnerHtml = "";

  categories.forEach((category) => {
    myInnerHtml += `
      <div class="${category.className}">
        <a href="${category.link}" class="${category.linkClass}">
          <img src="${category.image}" alt="Asiatisk mad til ${category.name}" />
          <span class="${category.ctaClass}">${category.name.toUpperCase()}</span>
        </a>
      </div>
    `;
  });

  catList.innerHTML = myInnerHtml;
}
