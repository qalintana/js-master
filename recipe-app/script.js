const meals = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');

const searchTerm = document.getElementById('search-term');
const seachBtn = document.getElementById('search');

const mealPopUp = document.getElementById('meal-popup-container');
const mealInfo = document.getElementById('meal-info');
const closePopUp = document.getElementById('close-popup');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const resposeData = await response.json();
  const randomMeal = resposeData.meals[0];

  // console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  );
  const resposeData = await meal.json();
  const mealEl = resposeData.meals[0];

  return mealEl;
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
  );

  const response = await meals.json();

  return response.meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
            <div class="meal-header">
            ${
              random ? `<span class="random"> Random Recipe </span>` : ''
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

    fetchFavMeals();
  });
  meal.addEventListener('click', () => {
    showMealInfo(mealData);
  });
  meals.appendChild(meal);
}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  const mealsToAddInLS = [...mealIds, mealId];

  localStorage.setItem('mealIDs', [JSON.stringify(mealsToAddInLS)]);
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIDs'));

  return mealIds === null ? [] : mealIds;
}

function removeMealFromLS(mealId) {
  const mealIds = [...getMealsFromLS()];

  if (!mealIds) {
    return;
  }

  // console.log(
  //   mealIds.forEach((meal) => meal),
  //   +'djisdwdji'
  // );

  localStorage.setItem(
    'mealIDs',
    JSON.stringify(
      mealIds.filter((mealEl) => {
        return mealEl !== mealId;
      })
    )
  );
}

async function fetchFavMeals() {
  favoriteContainer.innerHTML = '';

  const mealIds = getMealsFromLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    let meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favMeal = document.createElement('li');

  favMeal.innerHTML = `     
    <img src="${mealData.strMealThumb}" alt="" />
    <span>${mealData.strMeal}</span>    
    <button class="clear">x</button>
  `;

  const btn = favMeal.querySelector('.clear');

  favoriteContainer.appendChild(favMeal);

  btn.addEventListener('click', () => {
    console.log(mealData.idMeal);
    removeMealFromLS(mealData.idMeal);

    fetchFavMeals();
  });
}

seachBtn.addEventListener('click', async () => {
  meals.innerHTML = '';
  const seach = searchTerm.value;
  searchTerm.value = '';

  const mealsEl = await getMealsBySearch(seach);

  if (mealsEl) {
    mealsEl.forEach((meal) => {
      addMeal(meal);
    });
  }
});

function showMealInfo(mealData) {
  mealInfo.innerHTML = '';
  const mealEl = document.createElement('div');

  mealEl.innerHTML = `
        <div>
          <h1>${mealData.strMeal}</h1>
          <img src="${mealData.strMealThumb}" alt="" />
        </div>
        <p>
          ${mealData.strInstructions}
        </p>
     `;
  mealInfo.appendChild(mealEl);

  mealPopUp.classList.remove('hidden');
}

closePopUp &&
  closePopUp.addEventListener('click', () => {
    mealPopUp.classList.add('hidden');
  });
