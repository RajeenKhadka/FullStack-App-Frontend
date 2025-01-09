//users-api.js

//set up the base url for the route
const LOCAL_URL = "http://localhost:5052";
const API_URL = "/api/users";
const URL = LOCAL_URL + API_URL;

export async function signUp(userData) {
  //Fetch uses an options object as a second arg to make requests
  //other than basic GET requests, include data, headers etc
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //FETCH REQUIRES DATA PAYLOADS TO BE STRINGIFIED
    //and assigned to the body property on the options object
    body: JSON.stringify(userData),
  });

  //Check if request was successful
  if (res.ok) {
    //eventually, res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function logIn(credentials) {
  const res = await fetch(URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  //Check if res was successful
  if (res.ok) {
    //this will resolve to JWT
    return res.json();
  } else {
    throw new Error("Invalid Log In");
  }
}
