// file for the entire model, all models; the recipe, for search, for bookmarks
export const state = {
  recipe: {},
};

// this function will not return anything, it will just change our state object above ^^ that will contain the recipe and into which the controller will then grab and take the recipe out of there (live connection between export and import)
export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc971`

      // "https://forkify-api.herokuapp.com/api/v2/recipes"
    );
    // fetch will return a promise, as its in async function can then await that promise
    // console.log(response);
    // convert to JSON - json method is available on all response objects. Response object is exactly   what the fetch function here returns
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
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
    alert(err);
  }
};
