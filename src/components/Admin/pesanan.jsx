import React, { Component, useEffect, useState } from 'react';
import SideNav from "./SideNavigation";
import axios from "axios";
import CompHistory from "./compHistory";
const Pesanan = () => {
    const [htrans, setHtrans] = useState([]);
    const [htransView, setHtransView] = useState([]);
    useEffect(() => {
        
        getHtransFromAPI();
        
    }, []);

    async function getHtransFromAPI(){
        
        axios.get("/api/getHtrans")
        .then(function (response){
            setHtrans(response.data);
            setHtransView(response.data);
        }).catch(function (error){
            console.log(error);
        });
    }
    return(
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="4"></SideNav>
                    
                    <div className="col-10">
                        <h3>Daftar Pesanan</h3>
                        <hr/>
                        <button className="btn btn-outline-primary mr-2">Semua Pesanan</button>
                        <button className="btn btn-outline-primary mr-2">Pesanan Belum dibaca</button>
                        <button className="btn btn-outline-primary mr-2">Pesanan Selesai</button>

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

export default Pesanan;