import React, { Component } from 'react';
import Navbar from "../NavBar";
import { Icon } from 'rsuite';
import {useHistory} from "react-router-dom";
const Home = () => {
    var history = useHistory();
    var nama = window.sessionStorage.getItem("nama");

    const onClickCart = (e) => {
        history.push("/cart");
    }

    const pesananAktif = (e) => {
        history.push("/pesananAktif");
    }

    const historyPesanan = (e) => {
        history.push("/historyPesanan");
    }

    return(
        <React.Fragment>
            <Navbar/>
            <div className="container-fluid">
                <h3 className="mt-3">Selamat datang, {nama}</h3>
                
                <div className="row mt-4">
                    <div className="col-2">
                        <div className="card" onClick={(e) => onClickCart(e)} style={{cursor:"pointer"}}>
                            <div className="card-body">
                                <div className="text-center">
                                    <Icon icon='shopping-cart' size="5x" style={{marginLeft:"auto", marginRight:"auto"}}/>
                                    <p className="mb-0">Keranjang</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="card" onClick={(e) => pesananAktif(e)} style={{cursor:"pointer"}}>
                            <div className="card-body">
                                <div className="text-center">
                                    <Icon icon='order-form' size="5x" style={{marginLeft:"auto", marginRight:"auto"}}/>
                                    <p className="mb-0">Pesanan Aktif</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="card" onClick={(e) => historyPesanan(e)} style={{cursor:"pointer"}}>
                            <div className="card-body">
                                <div className="text-center">
                                    <Icon icon='archive' size="5x" style={{marginLeft:"auto", marginRight:"auto"}}/>
                                    <p className="mb-0">Histori Pesanan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;