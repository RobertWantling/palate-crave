// Going to put all the variables that should be constants and that can be re-used across the project
// goal of having this file with all these variables will allow us to easily configure the project by simply changing some of the data that is here in this configuration file
// The only variables needed within this file are the ones that are responsible for defining some important data about the app such as the API URL
// API URL will be used numerous places like search data and also uploading recipe to the server
// use of uppercase identifying that variable wont change (const) CP
export const API_URL =
  "https://api.allorigins.win/raw?url=https://forkify-api.herokuapp.com/api/v2/recipes";

export const TIMEOUT_SEC = 10;
