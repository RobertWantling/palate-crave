import View from "./View.js";
// import icons from '../img/icons.svg'; // parcel 1
import icons from "url:../../img/icons.svg"; // parcel 2
// any package import have to declare here - any import from npm no need to speicfy any path
import { Fraction } from "fractional";

// file for all different views much bigger so good to seperate
// this will contain the rest of the code - do this because later also have a parent class called view which will contain a couple of methods that all the views should inherit
// also want to some private n public classes so makes easier with using class
class RecipeView extends View {
  // private fields
  // these two properties and render method are what all the views will have in common
  _parentElement = document.querySelector(".recipe");
  // the view itself now knows the msg to display
  _errorMessage = "We could not find that recipe, please try another one!";
  _message = "";

  addHandlerRender(handler) {
    // When have numerous events that wanted to run the same event handler function -  create array with events then loop over the array and do something
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  // this gm each view will render different HTML this method will generate the HTML so that the render method can then display that HTML on the page
  // # private method
  // all this function does is return a HTML string
  _generateMarkup() {
    console.log(this._data);
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
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
          ${this._data.ingredients
            ?.map(this._generateMarkupIngredient)
            .join("")}    
            </ul>                                        
          
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  // refactored function - seperate will recieve the ingredient and call it above^^ easier to handle
  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
      </div>
      </li>
`;
  }
}

export default new RecipeView();

// many real world applications have two special modules that are completely independent from the rest of the architecture. These are a module for project configuation and also a module for some general helper functions that can be very helpful throughout the entire application
/*
 <div class="recipe__details">
   <div class="recipe__info">
     <svg class="recipe__info-icon">
       <use href="src/img/icons.svg#icon-clock"></use>
     </svg>
     <span class="recipe__info-data recipe__info-data--minutes">45</span>
     <span class="recipe__info-text">minutes</span>
   </div>
   <div class="recipe__info">
     <svg class="recipe__info-icon">
       <use href="src/img/icons.svg#icon-users"></use>
     </svg>
     <span class="recipe__info-data recipe__info-data--people">4</span>
     <span class="recipe__info-text">servings</span>
     <div class="recipe__info-buttons">
       <button class="btn--tiny btn--increase-servings">
         <svg>
           <use href="src/img/icons.svg#icon-minus-circle"></use>
         </svg>
       </button>
       <button class="btn--tiny btn--increase-servings">
         <svg>
           <use href="src/img/icons.svg#icon-plus-circle"></use>
         </svg>
       </button>
     </div>
   </div>
         <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
   */

// going to create a parent class - be able to resuse all of these methods on all the views, on all the objects that are created through all the view classes
