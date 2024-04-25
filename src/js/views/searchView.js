// want to get query from the search field from the input - and want process of loading search results only when the button is clicked
class SearchView {
  // create parent el like recipeView and then target search form
  #parentEl = document.querySelector(".search");

  // this is concenred with the DOM so no need to be in the controller
  getQuery() {
    return this.#parentEl.querySelector(".search__field").value;
  }
}

// export an instnace the object that was created by the class ^^
export default new SearchView();

// view to render the results
