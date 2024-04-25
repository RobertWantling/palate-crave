import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import "@babel/polyfill";

// import icons from '../img/icons.svg'; // parcel 1
// import icons from "url:../img/icons.svg"; // parcel 2
// ensures old browsers are being supported by application
import "core-js/stable"; // used for ployfilling everything else
import "regenerator-runtime/runtime"; // used for polyfilling async/await

// const recipeContainer = document.querySelector(".recipe");

// const timeout = function (s) {
// return new Promise(function (_, reject) {
// setTimeout(function () {
// reject(new Error(`Request took too long! Timeout after ${s} second`));
// });
// });
// };
// timeout();
// make AJAX request to an API use fetch
const controlRecipes = async function () {
  try {
    // need to dynamically get the ID from the hash to be able to target the recipe
    const id = window.location.hash.slice(1);

    // create guard clause if no id then return id
    if (!id) return;

    // no longer need to pass in the parentElement. This will automatically render the spinner on the recipeView and same can be done later on with other views, bookmarksView, work exact same way - simple act on whatever view that we are calling them - this works because of parentElement and data on recipeView
    recipeView.renderSpinner();

    // 1) Loading recipe - call function for recipe from model
    // FIRSTLY - the recipe is loaded here
    await model.loadRecipe(id); // this is async function so will return a promise, have to await this function to avoid the promise before we can move on next step in execution in this async fucntion

    // 2) Rendering recipe
    // SECONDLY - store recipe into the state object (model.state.recipe) then pass that data into the render method
    // want to call recipeview data
    recipeView.render(model.state.recipe);
    // same as ^^ a lot cleaner and descriptive
    // const recipeView = new recipeView(model.state.recipe)
  } catch (err) {
    // This error msg should be instrinsic view of the error message
    recipeView.renderError(`🔥🔥🔥${err}🔥🔥🔥`);
  }
};
// controlRecipes();

// Want to listen out for the hashchange once certain recipe is clicked
// window.addEventListener("hashchange", controlRecipes);
// If want to load recipe onto another page have to listen for the load event
// window.addEventListener("load", controlRecipes);

// need to get the recipe id from the hashkey

// this controller function runs right at the beginning when application loads, for it to work need to listen for the event of basically clicking the search button or submitting a form. and only then will we want to call this controller funciton. Not in the beginning when the script loads
// call search function
const controlSearchResults = async function () {
  try {
    // 1) get search query
    const query = searchView.getQuery();
    // guard clause so if no query return immediately
    if (!query) return;

    // 2) load search results
    // here call the loadSearchResults we built in model
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// results view needs a render method, that takes in data and then renders to UI

// call function using publisher subscriber pattern - so will listen for the event in the searchView, then pass the controller function (handler function) into the method that we will build in searchView (addHandlerSearch)

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults); // pass in the controller function from searchView
};
init();
