// import icons from '../img/icons.svg'; // parcel 1
import icons from "url:../img/icons.svg"; // parcel 2
// ensures old browsers are being supported by application
import "core-js/stable"; // used for ployfilling everything else
import "regenerator-runtime/runtime"; // used for polyfilling async/await

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    });
  });
};

// use css to rotate line continuously
const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

// make AJAX request to an API use fetch
const showRecipe = async function () {
  try {
    // 1) Loading recipe
    renderSpinner(recipeContainer);
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );
    // fetch will return a promise, as its in async function can then await that promise

    // convert to JSON - json method is available on all response objects. Response object is exactly what the fetch function here returns
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    console.log(data, response);
    // let recipe = data.data.recipe;
    // recipes on both sides so able use destructuring
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2) Rendering recipe
    const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map((ing) => {
              return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                  </div>
                  </li>
            `;
            })
            .join("")}    
            </ul>                                        
          
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
    // need to loop over the ingred array and for each of them should create this markup syntax
    // before render a new markup have to get rid of the old markup - set it to nothing empty it out
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
