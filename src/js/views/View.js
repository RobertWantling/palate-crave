import icons from "url:../../img/icons.svg"; // parcel 2

export default class View {
  _data;

  // Public render method part of public API - this will recieve data and will set this._data to the data it just recieved
  // this method will now be responsible for putting html onto the
  page;
  // THIRDLY - render method takes that data and stores it inside of this._data - allows us to be able to use data all over the place inside the object
  render(data) {
    // data is held in this so able to use it all over application
    this._data = data;
    const markup = this._generateMarkup();
    // render method is responsilble for rendering anything onto the page
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // Create small method for clearing data (good habit of abstracting code)
  // This method will be usable for all the views as long as the views have parentEl property like data in recipeView()
  _clear() {
    this._parentElement.innerHTML = "";
  }

  // will be a public method so the controller can then call this method as it starts fetching the data
  // use css to rotate line continuously
  renderSpinner() {
    const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    // need to loop over the ingred array and for each of them should create this markup syntax
    // before render a new markup have to get rid of the old markup - set it to nothing empty it out;
    // as parentElement is already inside the object simple call it here
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}g#icon-alert-triangle"></use>
        </svg>
      </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}g#icon-smile"></use>
      </svg>
    </div>
      <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
