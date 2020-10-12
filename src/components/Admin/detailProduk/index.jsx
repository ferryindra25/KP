import React, { Component, useEffect, useState } from 'react';
import SideNav from "../SideNavigation";
import axios from "axios";

const DetailProduk = () => {
    var id_barang;
    var [detail_barang, setDetail_barang] = useState([]);
    var [spesifikasi, setSpesifikasi] = useState([]);

    useEffect(() => {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        id_barang = id;
        getDetailBarang();
        getSpesifikasi();
    }, []);

    async function getSpesifikasi(){
        axios.get("/api/getSpesifikasi?id_barang="+id_barang)
        .then(function (response){
            setSpesifikasi(response.data);
            console.log(response.data)
        }).catch(function (error){
            console.log(error);
        });
    }

    async function getDetailBarang(){
        axios.get("/api/getBarangByID?id_barang="+id_barang)
        .then(function (response){
            setDetail_barang(response.data[0]);
            console.log(response.data)
        }).catch(function (error){
            console.log(error);
        });
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="2-2"></SideNav>
                    
                    <div className="col-10">
                        <h3>Detail Produk</h3>
                        <div className="w-100" style={{padding : "10px 10px 20px 10px", border : "1px solid #cfcfcf", borderRadius : "10px", boxShadow: "1px 1px 10px #f2f2f2"}}>
                            <img src={"/product/"+detail_barang.gambar} className="w-50"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default DetailProduk;