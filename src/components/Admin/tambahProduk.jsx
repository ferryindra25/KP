import React, { Component } from 'react';
import CompTambahProduk from "./addProduct/index";
import SideNav from "./SideNavigation";

const TambahProduk = () => {
    
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="2-1"></SideNav>
                    <CompTambahProduk></CompTambahProduk>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TambahProduk;