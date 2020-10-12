import React, { Component } from 'react';
import NavbarAdmin from '../NavBarAdmin/index.jsx';
import Dashboard from "./dashboard";
import TambahProduk from "./tambahProduk";
import DaftarProduk from "./daftarProduk";
import Katagori from "./katagori";
import DetailProduk from "./detailProduk";

import { Switch, Route } from "react-router-dom";
const Admin = () => {
    return(
        <React.Fragment>
            <NavbarAdmin></NavbarAdmin>
            
            <Switch>
                <Route exact path = "/admin" component = { Dashboard } />
                <Route exact path = "/admin/tambahProduk" component = { TambahProduk } />
                <Route exact path = "/admin/daftarProduk" component = { DaftarProduk } />
                <Route exact path = "/admin/katagori" component = { Katagori } />
                <Route path = "/admin/detailProduk" component = { DetailProduk } />
            </Switch>
        </React.Fragment>
    );
}

export default Admin;