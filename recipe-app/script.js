const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const resposeData = await response.json();
  const randomMeal = resposeData.meals[0];

  console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  );
  console.log(meal);
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
  );

  console.log(meals);
}

function addMeal(mealData, random = false) {
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
            <div class="meal-header">
            ${
              random && `<span class="random"> Random Recipe </span>`
            }             
              <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
            </div>

            <div class="meal-body">
              <h4>${mealData.strMeal}</h4>
              <button class="fav-btn">
                <img src="img/Nova pasta/heart.svg" alt="" />
              </button>
            </div>
          `;
  meals.appendChild(meal);
}
