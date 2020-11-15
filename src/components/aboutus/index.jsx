import React, { Component, useState, useEffect } from 'react';
import Navbar from "../NavBar";
import axios from "axios";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import formInput from "../Admin/formInput";
import { ReplayOutlined } from '@material-ui/icons';

const About = () => {
    
    return(
        <>
        <Navbar></Navbar>
        <br></br>
        <div style={{width:"100%",height:"510px"}}>
            <div style={{width:"50%",float:"left",height:"100%"}}>
                <img src="/wallpaper/301928.jpg" style={{width:"80%",marginLeft:"160px"}}/>
            </div>
            <div style={{width:"50%",float:"right",height:"100%",padding:"5%"}}>
                <center><h2>Tentang Kami</h2><br></br>
                    <p style={{margin:"20px",fontFamily:"Arial",letterSpacing:"2px"}}>Toko Sepeda Bintang Terang menjual berbagai macam tipe sepeda mulai dari sepeda anak anak hingga sepeda untuk orang dewasa. Didirikan sejak tahun
                        1980 koleksi sepeda kami selalu bertambah dan mengikuti perkembangan zaman. Kami selalu mengutamakan kualitas dan tentunya harga yang selalu bersaing.
                    </p>
                    <h2>Kontak Kami</h2>
                    <p>Alamat : Jalan Pasar Turi 25 (Deretan PMK pasar turi)</p>
                    <p>Telepon : 031 3537081</p>
                </center>
            </div>
        </div>
        </>   
    );
}

export default About;