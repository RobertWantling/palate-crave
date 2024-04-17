// import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.JS";

// Goal of this module is to contain a couple of functions that we can use over and over again across the project - have central place for all of them
// CP create a function that will get JSON, a function which encapsulates const response = await fetch(`${API_URL}/${id}`);
// const data = await response.json();
// if (!response.ok) throw new Error(`${data.message} (${response.status})`);
// and some error handling

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    });
  });
};

// async will do the fetching - make sure getJSON fucntion accepts the url argument
export const getJSON = async (url) => {
  try {
    //const fetchProm = fetch(url);
    //const response = await Promise.race([fetchProm, timeout(TIMEOUT_SEC)]);

    // then use url parametre in the fetch()
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    // now this function returns data variable means data is going to be resolved value of the pormise that the getJSON function returns
    return data;
  } catch (err) {
    throw err;
  }
};

// bug explanation
/*   
So, the /recipes endpoint is meant to be used either with the search parameter or with the id of a recipe, for example:

https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

or

https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886.

Sending a request directly to the /recipes endpoint without the search query or an id should return a more meaningful response, but due to a bug in the API, it returns Http 500 (Internal Server Error) response.

So, the /recipes alone shouldn't return any recipes, but it should also return a more meaningful message, and not just Http 404.

*/
