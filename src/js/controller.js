import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
    // need to dynamically get the ID from the hash to be able to target the recipe
    const id = window.location.hash.slice(1);
    console.log(id);

    // create guard clause if no id then return id
    if (!id) return;

    renderSpinner(recipeContainer);

    // 1) Loading recipe - call function for recipe from model
    await model.loadRecipe(id); // this is async function so will return a promise, have to await this function to avoid the promise before we can move on next step in execution
    const { recipe } = model.state.recipe;

    // 2) Rendering recipe
    // want to call recipeview data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
// showRecipe();

// Want to listen out for the hashchange once certain recipe is clicked
// window.addEventListener("hashchange", showRecipe);
// If want to load recipe onto another page have to listen for the load event
// window.addEventListener("load", showRecipe);

// When have numerous events that wanted to run the same event handler function -  create array with events then loop over the array and do something
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipe)
);

// need to get the recipe id from the hashkey
