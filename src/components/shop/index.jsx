import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import useFormInput from '../Admin/formInput';
import NavBar from "../NavBar";
import ListProduct from "./listProduk";


const Shop = () => {
    const id_kat = getIDKatagori();
    

    function getIDKatagori(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id_katagori");
        return id;
    }
    function name(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("name");
        return id;
    }

    const [barang, setBarang] = useState([]);
    const [barangView, setBarangView] = useState([]);
    useEffect(() => {
        
        getBarangFromAPI();
        
    }, [id_kat]);

    async function getBarangFromAPI(){
        var id = getIDKatagori();
        axios.get("/api/getBarangbyKatagori?id_katagori=" + id)
        .then(function (response){
            setBarang(response.data);
            setBarangView(response.data);
            console.log(response.data)
        }).catch(function (error){
            console.log(error);
        });
    }

    function barangKosong(){
        if (barang.length == 0){
            return (
                <p>Tidak ada barang dalam katagori ini</p>
            );
        }
    }
    async function cariBarang(e){
        //e.preventDefault();
        var value = e.target.value;
        
        // try {
        //   const data = await fetch("api/getItemsByName?nama="+value, {
        //     method: "get"
        //   });
        //   setItem(await data.json());
        //   console.log(data);
        // } catch (error) {
        //   console.log("gagal");
        //   console.log(error);
        // }
        let items_temp = [...barang]
        let hasil = items_temp.filter((e)=> e.nama_barang.toLowerCase().includes(value.toLowerCase()))
        setBarangView(hasil)
    }

    return (
        <React.Fragment>
            <NavBar/>
            <div className="container">
                <h3>Welcome to {name()}</h3>
                {barangKosong()}
                <div className="row">
                    <div className="col-12">
                        <input type="text" id="search" className="form-control mt-3" placeholder="Cari Barang" onChange={cariBarang}/>
                        <hr/>
                    </div>
                    {barangView.map((item, index) => {
                        return (
                            <ListProduct nama={item.nama_barang} id={item.id_barang} deskripsi={item.deskripsi} gambar={item.gambar} harga={item.harga_barang}/>
                        );
                    })}
                </div>
                
            </div>
            

            
        </React.Fragment>
    );

}

export default Shop;