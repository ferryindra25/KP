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

    const onClikSemua = (e) => {
        setHtransView(htrans);
    }

    const onClikAktif = (e) => {
        let tempTrans = [...htrans]
        var dataBaru = tempTrans.filter(function(t){
            var dateTrans = t.status;
            return dateTrans < 3;
        })
        setHtransView(dataBaru);
    }

    const onClikSelesai = (e) => {
        let tempTrans = [...htrans]
        //console.log(tempTrans);
        var dataBaru = tempTrans.filter(function(t){
            var dateTrans = (t.status);
            return dateTrans == 3;
        })
        setHtransView(dataBaru);
    }
    return(
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="4"></SideNav>
                    
                    <div className="col-10">
                        <h3>Daftar Pesanan</h3>
                        <hr/>
                        <button className="btn btn-outline-primary mr-2" onClick={(e) => onClikSemua(e)}>Semua Pesanan</button>
                        <button className="btn btn-outline-primary mr-2" onClick={(e) => onClikAktif(e)}>Order Aktif</button>
                        <button className="btn btn-outline-primary mr-2" onClick={(e) => onClikSelesai(e)}>Pesanan Selesai</button>

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