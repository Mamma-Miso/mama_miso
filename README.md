# Teknisk dokumentation – [Mama Miso]

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et Rest API.

Sitet består af flere sider, hvor brugeren kan:

- Vælge om de vil se opskrifter eller besøge et online supermarket
- Udfylde en formular
- Vælge mellem forskellige måltider
- Se en liste med opskrifter
- Bruge filtrering
- Klikke sig videre til en opskrift, hvor de f.eks. kan læse om ingredienser og fremgangsmåde

## Links

- GitHub repository: [https://github.com/Mamma-Miso/mama_miso]
- GitHub Pages: [https://mamma-miso.github.io/mama_miso/index.html]
- Figma: [https://www.figma.com/design/EKyXzr3IlDo0s3h01g47HZ/Dummy-JSON---Grupp-6?node-id=0-1&t=wzqwzM1Yxv96SmDk-1]

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
mama_miso/
├── index.html
├── categorylist.html
├── supermarket.html
├── lunch.html
├── dinner.html
├── dessert.html
├── beverage.html
├── detailview.html
├── css/
│   └── style.css
│   └── layout.css
│   └── categorylist.css
│   └── supermarket.css
│   └── listview.css
│   └── detailview.css
├── js/
│   └── categorylist.js
│   └── listview.js
│   └── detailview.js
│   └── popup.js
│   └── burgermenu.js
│── img/
│   └──
└── README.md
```

### Filbeskrivelser

- **index.html** – forsiden
- **categorylist.html** - viser fire måltidskategorier
- **supermarket.html** - en spøgelsesside der viser at vi har et supermarket
- **lunch.html**, **dinner.html**, **dessert.html**, **beverage.html** - viser en liste med opskrifter
- **detailview.html** - viser detaljer om en valgt opskrift

- **style.css** – generelt design
- **layout.css** – består hovedsagelig af layout som display:grid etc.
- **categorylist.css**, **supermarket.css**, **listview.css**, **detailview.css** - design af tilhørende html sider
- **JavaScript-filer** – styrer det dynamiske indhold på de forskellige sider

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så næsten hver side har sin egen fil.

### categorylist.js

Henter data fra API'et og viser en liste med måltidskategorier på siden.

### listview.js

Henter data fra API'et og viser en liste med opskrifter på siden.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på en opskrift

### detailview.js

Bruges til detaljesiden. Den læser et id fra URL'en og henter derefter den rigtige opskrift fra API'et.

Det gør det muligt at genbruge den samme HTML-side til mange opskrifter. I stedet for at lave én side per opskrift, bruger vi ét id i URL'en til at vise det rigtige indhold.

### popup.js

Sørger for at pop-up vinduet vises efter 2sek og at den lukkes igen ved tryk på en knap.

### burgermenu.js

Toggler mellem aktiv og inaktiv på burgermenuen

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const recipeList;
const totalTime;
const difficultyBtns;
```

### Eksempler på funktioner

```javascript
getData();
showRecipes();
applyFilters();
closePopup();
```

Vi har brugt camelCase i JavaScript, fordi det gør koden mere ensartet og lettere at læse.

---

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening.
Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
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
```

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 1,
  "name": "Classic Margherita Pizza",
  "ingredients": [
    "Pizza dough",
    "Tomato sauce",
    "Fresh mozzarella cheese",
    "Fresh basil leaves",
    "Olive oil",
    "Salt and pepper to taste"
  ],
  "instructions": [
    "Preheat the oven to 475°F (245°C).",
    "Roll out the pizza dough and spread tomato sauce evenly.",
    "Top with slices of fresh mozzarella and fresh basil leaves.",
    "Drizzle with olive oil and season with salt and pepper.",
    "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
    "Slice and serve hot."
  ],
  "prepTimeMinutes": 20,
  "cookTimeMinutes": 15,
  "servings": 4,
  "difficulty": "Easy",
  "cuisine": "Italian",
  "caloriesPerServing": 300,
  "tags": ["Pizza", "Italian"],
  "userId": 166,
  "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
  "rating": 4.6,
  "reviewCount": 98,
  "mealType": ["Dinner"]
}
```

### Felter vi bruger

- **id** – bruges til at sende brugeren videre til detaljesiden
- **name** – opskriftsnavn
- **ingredients** – ingredienserne
- **instructions** – fremgangsmåde
- **prepTimeMinutes** – tilberedningstid i minutter
- **cookTimeMinutes** – kogetid i minutter
- **servings** – antal portioner
- **difficulty** – sværhedsgrad
- **cuisine** – opskriftkategori (fx dessert, hovedret, forret)
- **caloriesPerServing** – antal kalorier
- **tags** – søgeord til opskriften
- **image** – opskriftsbillede
- **rating** – bedømmelse af opskriften
- **mealType** – hvilket slags måltid opskriften er

---

## Formular og validering

Vi har lavet en formular, hvor brugeren kan indtaste oplysninger.

**HTML-validering:**

- `required` – feltet skal udfyldes
- `type="email"` – validerer email-format

Det sikrer, at brugeren ikke kan sende formularen, hvis felterne ikke er udfyldt korrekt.

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet.

Vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid.

Vi navngav branchene meget forskelligt

### Eksempler på branches

- `js_opsætning`
- `Header-&-footer-Anne`
- `category_side`

### Workflow

1. Lave en branch med feature-navn
2. Kode en feature
3. Gå på main
4. Committe ændringer
5. Pushe til GitHub

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at holde page weight under 250 kb samt en enkel informationasarkitektur.

**Tiltag:**

- Ingen videoer
- Ingen tunge frameworks
- Genbruge af kode

---

## Udfordringer undervejs

En af vores udfordringer var at få data fra Rest API’et vist korrekt på siderne.

**Løsninger:**

- Console.logge data undervejs
- Teste fetch-kald separat
- Bruge URLSearchParams
- Dele opgaverne mere tydeligt i gruppen

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Søgefunktion
- Fuldt fungerende formular
- Finde ud af hvordan man laver listview.html til én side i stedet for 4.

---

## Gruppemedlemmer

- Anne Rosenvold Tygesen
- Mathilda Leidersdorff-Menzel
- Rúni Dybczak
