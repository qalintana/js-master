const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const resposeData = await response.json();
  const randomMeal = resposeData.meals[0];

  // console.log(randomMeal);

  addMeal(randomMeal, true);
  console.log(localStorage.getItem('mealIDs'));
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

  const btn = meal.querySelector('.meal-body .fav-btn');

  btn.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      removeMealFromLS(mealData.idMeal);
      this.classList.remove('active');
      this.innerHTML = `<img src="img/Nova pasta/heart.svg" alt="" />`;
    } else {
      this.classList.add('active');
      addMealToLS(mealData.idMeal);
      this.innerHTML = `
          <img src="img/heart.svg" alt="" />
        `;
    }
  });
  meals.appendChild(meal);
}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem('mealIDs', [...JSON.stringify(mealIds), mealId]);
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealsIDs'));

  return mealIds === null ? [] : mealIds;
}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();

  if (!mealIds) {
    return;
  }

  localStorage.setItem(
    'mealIds',
    JSON.stringify(mealIds.filter((meal) => meal.id !== mealId))
  );
}
