import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Blank from "./components/Blank/Blank";
import Admin from "./components/Admin/adminRoute";
import addProduct from "./components/addProduct";
import catagory from "./components/catagory";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        
        <Switch>
          <Route exact path = "/" component = { Blank } />
          <Route exact path = "/login" component = { Login } />
          <Route exact path = "/register" component = { Register } />
          <Route exact path = "/addProduct" component = { addProduct } />
          <Route exact path = "/catagory" component = { catagory } />
          <Route path = "/admin" component = { Admin } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
