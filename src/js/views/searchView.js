// want to get query from the search field from the input - and want process of loading search results only when the button is clicked
class SearchView {
  // create parent el like recipeView and then target search form
  #parentEl = document.querySelector(".search");

  // this is concenred with the DOM so no need to be in the controller
  // make it much easier to add features in the future
  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  // clear the form after search
  #clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }

  // this will be the publisher and the control search results function will be the subscriber
  addHandlerSearch(handler) {
    // add event listener to the entire form and not just button (use submit event - works with enter and submit press)
    this.#parentEl.addEventListener("submit", function (e) {
      // need first prevent default action otherwise page is going to reload
      e.preventDefault();
      // then call handler function - know that this should be the control searchResults function - have to now call this method and pass in that function
      handler();
    });
  }
}

// export an instnace the object that was created by the class ^^
export default new SearchView();

// view to render the results
