import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Blank from "./components/Blank/Blank";
import Admin from "./components/Admin/adminRoute";
import shop from "./components/shop";
import detail from "./components/detail";
import home from "./components/home";
import cart from "./components/cart";
import pesananAktif from "./components/pesananAktif";
import historyPesanan from "./components/historyPesanan";
import About from "./components/aboutus";
import konfirm from "./components/KonfirmasiBayar";
//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        
        <Switch>
          <Route exact path = "/" component = { Blank } />
          <Route exact path = "/login" component = { Login } />
          <Route exact path = "/register" component = { Register } />
          <Route exact path = "/pesananAktif" component = { pesananAktif } />
          <Route exact path = "/historyPesanan" component = { historyPesanan } />
          <Route exact path = "/home" component = { home } />
          <Route exact path = "/cart" component = { cart } />
          <Route exact path = "/about" component = { About } />
          <Route exact path = "/konfirm" component = { konfirm } />
          <Route path = "/admin" component = { Admin } />
          <Route path = "/shop" component = { shop } />
          <Route path = "/detail" component = { detail } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
