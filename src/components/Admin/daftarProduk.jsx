import React, { Component, useState, useEffect } from 'react';
import SideNav from "./SideNavigation";
import axios from "axios";
import ListProduct from "./listProduct";

const DaftarProduk = () => {
    const [katagori, setKatagori] = useState([]);
    const [barang, setBarang] = useState([]);
    async function getDataKatagoriFromAPI(){
        axios.get("/api/getKatagori")
        .then(function (response){
            setKatagori(response.data);
        }).catch(function (error){
            console.log(error);
        });
    }
    async function getBarangFromAPI(){
        axios.get("/api/getBarang")
        .then(function (response){
            setBarang(response.data);
            console.log(response.data)
        }).catch(function (error){
            console.log(error);
        });
    }
    useEffect(() => {
        getDataKatagoriFromAPI();
        getBarangFromAPI();
        
    }, []);
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="2-2"></SideNav>
                    
                    <div className="col-10">
                        <h3>daftar produk</h3>
                        <div className="row">
                            {barang.map((item, index) => {
                                return (
                                    <ListProduct nama={item.nama_barang} id={item.id_barang} deskripsi={item.deskripsi} gambar={item.gambar} harga={item.harga_barang}/>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default DaftarProduk;