let recipeCollection = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Pepper"],
    steps: [
      "Boil the spaghetti.",
      "Cook the pancetta until crisp.",
      "Mix eggs and cheese in a bowl.",
      "Combine spaghetti with pancetta and remove from heat.",
      "Stir in the egg mixture and serve."
    ],
    image: "images/spaghetti_carbonara.jpg"
  },
  {
    id: 2,
    name: "Chicken Curry",
    description: "A flavorful chicken curry.",
    ingredients: ["Chicken", "Onions", "Tomatoes", "Garlic", "Spices"],
    steps: [
      "Sauté onions and garlic.",
      "Add spices and cook until fragrant.",
      "Add chicken and brown.",
      "Add tomatoes and simmer until chicken is cooked.",
      "Serve with rice."
    ],
    image: "images/chicken_curry.jpg"
  }
];

function findRecipes() {
  let searchInput = document.getElementById('recipe-search').value.toLowerCase();
  let searchResults = recipeCollection.filter(recipe => recipe.name.toLowerCase().includes(searchInput));
  displayRecipeOverview(searchResults);
}

function displayRecipeOverview(recipes) {
  let overviewSection = document.getElementById('recipes-overview');
  overviewSection.innerHTML = '';

  if (recipes.length === 0) {
    overviewSection.innerHTML = '<p class="no-results">Recipe not found</p>';
  } else {
    recipes.forEach(recipe => {
      let recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `<a href="#" class="recipe-link">${recipe.name} - ${recipe.description}</a>`;
      recipeCard.addEventListener('click', () => {
        showRecipeDetails(recipe);
        recipeCard.querySelector('.recipe-link').classList.add('selected');
      });
      overviewSection.appendChild(recipeCard);
    });
  }
}

function showRecipeDetails(recipe) {
  let detailsSection = document.getElementById('recipe-info');
  detailsSection.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}">
    <h3>Ingredients:</h3>
    <ul>
      ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    <h3>Steps:</h3>
    <ol>
      ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
    <button id="print-btn">Print Recipe</button>
  `;
  document.querySelectorAll('#recipe-info li').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked-off'));
  });
  document.getElementById('print-btn').addEventListener('click', () => window.print());

  // Hide the About Us and Contact sections
  document.getElementById('about-section').classList.add('hidden-section');
  document.getElementById('contact-section').classList.add('hidden-section');
}

document.querySelectorAll('header nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (link.getAttribute('href') === '#about-section') {
      document.getElementById('about-section').classList.remove('hidden-section');
      document.getElementById('contact-section').classList.add('hidden-section');
    } else if (link.getAttribute('href') === '#contact-section') {
      document.getElementById('about-section').classList.add('hidden-section');
      document.getElementById('contact-section').classList.remove('hidden-section');
    } else {
      document.getElementById('about-section').classList.add('hidden-section');
      document.getElementById('contact-section').classList.add('hidden-section');
    }
  });
});
