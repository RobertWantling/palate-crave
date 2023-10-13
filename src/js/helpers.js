import { async } from "regenerator-runtime";
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

// async will do the fetching
export const getJSON = async function (url) {
  try {
    // const fetchProm = fetch(url);
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    // now this function returns data variable means data is going to be resolved value of the pormise that the getJSON function returns
    return data;
  } catch (err) {
    throw err;
  }
};
