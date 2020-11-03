import React, { Component, useState, useEffect } from 'react';
import Navbar from "../NavBar";
import axios from "axios";
import CompHistory from "../compHistory";

const HistoryPesanan = () => {
    const [htrans, setHtrans] = useState([]);
    const [htransView, setHtransView] = useState([]);
    useEffect(() => {
        
        getHtransFromAPI();
        
    }, []);

    async function getHtransFromAPI(){
        var token = window.sessionStorage.getItem("token");
        axios.get("/api/historyPesanan?token="+token)
        .then(function (response){
            setHtrans(response.data);
            setHtransView(response.data);
        }).catch(function (error){
            console.log(error);
        });
    }
    return(
        <React.Fragment>
            <Navbar/>
            <div className="container-fluid">
                <h3 className="mt-3">History Pesanan</h3>
                <div className="row">
                    <div className="col-12">
                    {
                        htransView.map((item,index) => {
                            return (
                                <CompHistory tgl={new Date(item.tgl_trans)} status={item.status} id={item.id_trans} nama={item.nama_customer} catatan={item.catatan} tgl_pengambilan={new Date(item.tanggal_pengambilan)} transAPI={() => getHtransFromAPI()}></CompHistory>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HistoryPesanan;