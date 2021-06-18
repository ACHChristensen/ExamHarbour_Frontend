import React, { useState, useEffect } from "react";
import facade, { handleHttpErrors } from "./apiFacade.jsx";
import GetAllOwnersUI from "./ownersFacade.jsx";
import GetBoatsByHabour, {habourSelect} from "./showBoats.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
  Redirect,
  useHistory,
  onSubmit
} from "react-router-dom";
import "./index.css";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

let owners = [];

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  useEffect(() => {
    setLoggedIn(facade.tjekLogin)
  }, []);

  const logOut = () => {
    facade.logout();
    setLoggedIn(false);
    history.push('/');
  };

  let test = null;
 const login = (user, pass) => {
   facade.login(user, pass);
    const token = window.sessionStorage.getItem("jwtToken");
    if (token == ! null) {
      setLoggedIn(true);
      test = test + "succes";
    }
    return test;
  };


  return (
    <>
      {loggedIn ? (
        <div>
          <HeaderLogo />
          <HeaderNav />
          <Switch>
            <Route path="/owners">
              <GetAllOwnersUI loggedIn={loggedIn}/>
            </Route>
            <Route path="/harbours">
              <GetBoatsByHabour habours={facade.fetchHabours} boatss ={habourSelect.boats} />
            </Route>
            <Route path="/logout">{logOut}</Route>
            <Route>
              <Home/>
          </Route>
          </Switch>
        </div>
        
      ) : (
        <Route >
          <Video />
          <LogIn login={login} test={test} />
        </Route>
        
      )}

    </>
  ) ;
}

// function Logout(logOut) {
//   return (
//     <div>
//       <h3>Er du sikker på du vil logge af?</h3>
//       <input type="button" id="logoutbutton">Ja</input>
//     </div>
//   );
// }

export function HeaderLogo() {

  function onSubmit(e) {
    App.logOut();
  }

  return (
    <div>
      <ul className="header">
        <li className="logout">
          <Link className="active" to="/logout">
            <button type="button " className={`btn btn-outline-dark`} id="logout" onClick={App.logOut}>
              Log af
            </button>

          </Link>
        </li>
        <li className="logo">
          <NavLink to="/home">
            <img src="favicon.ico" width="200vw" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
function Video() {
  return (<div><div className="video-background">
    <iframe className="fullscreen-bg " frameBorder="0" allowtransparency="true" allowFullScreen autoPlay playlist="true"
      src={"https://www.youtube.com/embed/7P9PFp8G4g8?autoplay=1&mute=0"} /></div>
  </div>);
}
export function HeaderNav() {
  return (
    <div>
      <ul className="headernav">
        <li>
          <NavLink activeClassName="active" to="/owners">
            Ejere
          </NavLink>
          <NavLink activeClassName="active" to="/harbours">
            Havne
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export function Home() {
  return (
    <>
      <h2>Lavet af Cathrine</h2>
    </>
  );
}

function LogIn({ login }, {test}) {
  const init = { username: "", password: "" }; 
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
  login(loginCredentials.username, loginCredentials.password);

    if (test === null) {
      alert("There is no such user or admin")
    } else{
      window.location.href = "/";
      window.sessionStorage.setItem("jwtToken", true);
    }
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div className="login padimage">
        <img src="favicon.ico" width="400vw" />
        <h4>Havne IT-system</h4>
        <h2>Login</h2>
        <form onChange={onChange}>
          <input type="text" placeholder="User Name" id="username" />
          <br />
          <input type="password" placeholder="Password" id="password" />
          <br />
          <br />
          <button className={`btn btn-outline-dark`} onClick={performLogin}>Login</button>
        </form>
      </div>
    </>
  );
}

export default App;
