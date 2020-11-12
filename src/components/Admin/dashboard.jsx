import React, { Component, useState, useEffect } from 'react';
import SideNav from "./SideNavigation";
import axios from "axios";
import NumberFormat from 'react-number-format';

const Dashboard = () =>{
    var [totalJual, setTotalJual] = useState("");
    var [barangPalingLaku, setBarangPalingLaku] = useState([]);
    function getTotalJual(){
        axios.get("/api/getTotalJual")
        .then(function (response){
            setTotalJual(response.data.total);
        }).catch(function (error){
            console.log(error);
        });
    }
    function getBarangpalingLaku (){
        axios.get("/api/getBarangPalingLaku")
        .then(function (response){
            setBarangPalingLaku(response.data);
        }).catch(function (error){
            console.log(error);
        });
    }
    useEffect(() => {
        
        getTotalJual();
        getBarangpalingLaku();

    }, []);
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="1"></SideNav>
                    <div className="col-10">
                        <h2>Dashboard</h2>
                        <p>Penjualan</p>
                        <div className="card">
                            <div className="card-body">
                                <NumberFormat className="w-100" style={{fontSize:"3vh", color:"black"}} value={totalJual} displayType={'text'} thousandSeparator={true} prefix={'Total Penjualan = Rp. '} />
                                <p className="mt-3">Produk yang paling banyak dibeli</p>
                                <div style={{height:"300px", overflowY : "auto"}}>
                                    <table className="table table-bordered">
                                        <tr>
                                            <td>ID</td>
                                            <td>Nama Barang</td>
                                            <td>Terjual</td>
                                        </tr>
                                        {barangPalingLaku.map((item, index) => {
                                            return(
                                                <tr>
                                                    <td>{item.id_barang}</td>
                                                    <td>{item.nama_barang}</td>
                                                    <td>{item.terjual}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    );
}

export default Dashboard;