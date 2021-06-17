//import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import React, { useState, useEffect } from "react";


const URL ="https://achc.dk/HarbourExam"
//const URL = "http://localhost:8080/cathrinesbackend";

export function handleHttpErrors(res) {
  console.log(res.code)
  if (!res.code == null) {
    return ({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    //const decodedToken = jwt_decode(token);
    //let timeBeforeExp = decodedToken["exp"];
    window.sessionStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return window.sessionStorage.getItem;
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    window.sessionStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then((res) => {
        console.log(res)
        if (res.ok === true) {
            setToken(res.token);  
           
        }
      });
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
  };

  const tjekRoles = () => {
    let roles = [];
    const token = window.sessionStorage.getItem;
    const decodedToken = jwt_decode(token);
    roles.push(decodedToken["roles"]);
    return roles;
  }

  const tjekLogin = () => {

    // let token = window.sessionStorage.getItem("jwtToken");
    // if(token.length===0){ return false};
    // const decodedToken = (jwt_decode(token));
    // let timeBeforeExp = decodedToken["exp"];
    // console.log(timeBeforeExp);
    const now = new Date().getTime();
    // timeBeforeExp -= now;
    // console.log("Her jeg = " + timeBeforeExp);

    if (
      window.sessionStorage.getItem("jwtToken") == null //|| 0 >= timeBeforeExp
    ) {
      return false;
    } else {
      return true;
    }
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }

    return opts;
  };

  // function getAllOwners() {
  //   let allOwnersURL = "";
  //   allOwnersURL = allOwnersURL.concat(URL,"api/owners");
  //   const options = makeOptions("GET", true)
  //   const fetching = fetch(allOwnersURL, options)
  //       .then(handleHttpErrors);
  //       return JSON.stringify(fetching.then());
  // }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    tjekLogin,

  };
}
const facade = apiFacade();
export default facade;
