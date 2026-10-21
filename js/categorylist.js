"use strict";

// Viser i konsollen, at JavaScript-filen fungerer
console.log("1. CATEGORYLIST JS VIRKER!");

// URL til DummyJSON API'et, hvor vi henter op til 50 opskrifter
const productUrl = "https://dummyjson.com/recipes?limit=50";

// Finder HTML-elementet, hvor kategorierne skal vises
const catList = document.querySelector(".grid_categories");

console.log("2. catList:", catList);

// Starter funktionen, der henter data fra API'et
getData();

function getData() {
  console.log("3. Vi forsøger at hente data fra API'et");

  // Henter data fra API'et ved hjælp af fetch()
  fetch(productUrl)
    .then((result) => {
      // Viser API'ets HTTP-statuskode i konsollen
      console.log("4. API-status:", result.status);

      // Konverterer svaret fra API'et til JSON-format
      return result.json();
    })
    .then((data) => {
      // Viser de modtagne data i konsollen
      console.log("5. Data fra API:", data);

      // Sender dataene videre til funktionen showData()
      showData(data);
    })
    .catch((error) => {
      // Viser en fejl i konsollen, hvis datahentningen fejler
      console.log("FEJL:", error);
    });
}

function showData(data) {
  // Gemmer opskrifterne fra API-svaret i en variabel
  const recipes = data.recipes;

  // Filtrerer opskrifterne, så kun asiatiske opskrifter med
  // bestemte tags bliver valgt
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

  // Filtrerer de asiatiske opskrifter efter måltidstype
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

  // Viser antallet af opskrifter i hver kategori i konsollen
  console.log("Asiatiske opskrifter:", asianRecipes.length);
  console.log("Lunch:", lunchRecipes.length);
  console.log("Dinner:", dinnerRecipes.length);
  console.log("Dessert:", dessertRecipes.length);
  console.log("Beverage:", beverageRecipes.length);

  // Kalder funktionen, der opretter og viser kategorikortene
  showCategories();
}

function showCategories() {
  // Opretter et array med oplysninger om hver kategori,
  // herunder navn, CSS-klasser, link og billede
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

  // Opretter en tom streng, som HTML-koden til kortene samles i
  let myInnerHtml = "";

  // Gennemgår alle kategorierne i arrayet
  categories.forEach((category) => {
    // Genererer HTML for hvert kategorikort ved hjælp af en template literal
    // Indsætter kategoriens oplysninger dynamisk i HTML-koden
    myInnerHtml += `
      <div class="${category.className}">
        <a href="${category.link}" class="${category.linkClass}">
          <img src="${category.image}" alt="Asiatisk mad til ${category.name}" />
          <span class="${category.ctaClass}">${category.name.toUpperCase()}</span>
        </a>
      </div>
    `;
  });

  // Indsætter den genererede HTML i kategorilisten på hjemmesiden
  catList.innerHTML = myInnerHtml;
}
