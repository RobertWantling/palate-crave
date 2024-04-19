// import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

// file for the entire model, all models; the recipe, for search, for bookmarks
// once this state is updated it will auto update in controller file as well
// store new objects in our state - this contains all the data we need in order to build the app
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

// this function will not return anything, it will just change our state object above ^^ that will contain the recipe and into which the controller will then grab and take the recipe out of there (live connection between export and import)
export const loadRecipe = async function (id) {
  try {
    // exported api from config file - data will become resolved value of getJSON promise hence why we then await that promise and store that resolved value into the data variable
    const data = await getJSON(`${API_URL}/${id}`);

    // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`

    // "https://forkify-api.herokuapp.com/api/v2/recipes"
    // fetch will return a promise, as its in async function can then await that promise
    // console.log(response);
    // convert to JSON - json method is available on all response objects. Response object is exactly   what the fetch function here returns
    // const data = await response.json();
    // if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    // console.log(data, response);
    // let recipe = data.data.recipe;
    // recipes on both sides so able use destructuring

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    // temp error handling
    console.error(`🔥🔥🔥🔥🔥🔥${err}🔥🔥🔥🔥🔥🔥🔥`);
    throw err;
  }
};

// search results functionality - find easier to start with the data, bascially the model - start making some API calls in order to load some search results. once that works can render them on the screen and handle the actual event

// create a function that will be exported so can be used by controller
// will be performing AJAX calls so going to be async / controller will tell this function what it would search for so pass in query like string parametre which can then be plucked into the API call
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // use getjson method to fetch the data and convert it to JSON n create error if something is wrong
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    // take data and store it into our state / reate new objects based on data we receive from JSON call
    // this is the array of all the objects - want to create a new array that contains new objects where prop names are different
    state.search.results = data.data.recipes.map((rec) => {
      // this will return a new array with new objects
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`🔥🔥🔥🔥🔥🔥${err}🔥🔥🔥🔥🔥🔥🔥`);
    throw err;
  }
};
