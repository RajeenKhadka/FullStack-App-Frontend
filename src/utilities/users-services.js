import * as usersAPI from "./users-api";

//I need to pass in userData because this is attempting
//to add a new user to the database
export async function signUp(userData) {
  //Delegate the network request code to the users-api.js API module
  //which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  console.log(token);
  //for now, we will console.log the token to see that it exists and return
  //the name and email that was sent to us
  //we will also eventually save the token in localStorage
  localStorage.setItem("token", token);
  return getUser();
}

export async function logIn(credentials) {
  const token = await usersAPI.logIn(credentials);

  //Persist the token
  localStorage.setItem("token", token);
  console.log(token);

  return getUser();
}

export function getToken() {
  //getItem returns null if there is no stringin the key "token" or the key doesn't exist
  const token = localStorage.getItem("token");
  if (!token) return null;
  //Obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  //check the expiration
  //A JWT's expiration is expressed in milliseconds, not seconds, so convert
  if (payload.exp < Date.now() / 1000) {
    //Token had expired and we remove it from local storage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  //If there is a token, return the user in the payload, otherwise return null
  //split the token, parse the second part of it, once you decode, access the user key in the object
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
  localStorage.removeItem("token");
}

export default { logIn };
