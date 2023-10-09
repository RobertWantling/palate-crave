const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        });
    });
};
// make AJAX request to an API use fetch
const showRecipe = async function() {
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        // fetch will return a promise, as its in async function can then await that promise
        // convert to JSON - json method is available on all response objects. Response object is exactly what the fetch function here returns
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        console.log(response, data);
    } catch (err) {
        alert(err);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
