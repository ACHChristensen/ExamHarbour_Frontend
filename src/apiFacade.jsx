//import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import React, { useState, useEffect } from "react";


export const URL_SERVER ="https://achc.dk/HarbourExam"
//export const URL_SERVER = "http://localhost:8080/cathrinesbackend";

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
    return fetch(URL_SERVER + "/api/login", options)
      .then((res) => {
        console.log(res)
        if (res.ok === true) {
            setToken(res.token);  
           
        }
      });
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL_SERVER + "/api/info/user", options).then(handleHttpErrors);
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

  function fetchHabours(){
      const makeOptions = (method, body) => {
      var opts = {
          method: method,
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
          },
      };
      if (body) {
          opts.body = JSON.stringify(body);
      }
      return opts;
  };
  const options = makeOptions("GET", true);
      return fetch(URL_SERVER + "/api/habours", options).then(handleHttpErrors);
 }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    tjekLogin,
    fetchHabours
  };
}
const facade = apiFacade();
export default facade;
