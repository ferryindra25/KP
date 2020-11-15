import React, { Component } from 'react';
import Navbar from "../NavBar";
import { Icon } from 'rsuite';
import {useHistory} from "react-router-dom";


const konfirm = () => {
    return(
        <>
        <Navbar></Navbar>
        <div style={{width:"100%",height:"100%"}}>
        <center><h2>Silahkan transfer sejumlah Rp {window.sessionStorage.getItem("total")} ke rekening BCA a/n CV Bintang Terang 41123113 dan konfirmasi pembayaran melalui Whatsapp atau SMS pada 081232515588</h2>
            *pesanan anda akan diproses setelah pembayaran kami terima <br />
            *pesanan anda akan dibatalkan otomatis setelah 24 jam pembayaran tidak terkonfirmasi oleh admin<br /><br />
            <b>Format Konfirmasi <br /></b>
            Nama Pemesan : xxxxx <br />
            Jumlah Transfer : xxxxx <br />
            Bukti Transfer : xxxxx <br />
            </center>
        </div>
            
        </>
    );
}

export default konfirm;