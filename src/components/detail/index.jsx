import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import useFormInput from '../Admin/formInput';
import NavBar from "../NavBar";
import { SideBySideMagnifier } from "react-image-magnifiers";
import NumberFormat from 'react-number-format';

const Detail = () => {
    var [detail_barang, setDetail_barang] = useState([]);

    const namaBarang = useFormInput("");
    const deskripsiBarang = useFormInput("");
    const hargaBarang = useFormInput("");
    const gambarLama = useFormInput("");
    const color = useFormInput("");
    const frame = useFormInput("");
    const fork = useFormInput("");
    const shiftter = useFormInput("");
    const rd = useFormInput("");
    const brake = useFormInput("");
    const freewheel = useFormInput("");
    const pedal = useFormInput("");
    const crankset = useFormInput("");
    const bb = useFormInput("");
    const chain = useFormInput("");
    const fh = useFormInput("");
    const rh = useFormInput("");
    const spokes = useFormInput("");
    const rim = useFormInput("");
    const tires = useFormInput("");
    const saddle = useFormInput("");
    const stem = useFormInput("");
    const seatpost = useFormInput("");
    const handlebar = useFormInput("");

    function getIDBarang(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id_barang");
        return id;
    }

    

    async function getDetailBarang(){
        axios.get("/api/getBarangByID?id_barang="+getIDBarang())
        .then(function (response){
            setDetail_barang(response.data[0]);
            namaBarang.setValue(response.data[0].nama_barang);
            deskripsiBarang.setValue(response.data[0].deskripsi);
            hargaBarang.setValue(response.data[0].harga_barang);
            gambarLama.setValue(response.data[0].gambar);
            
        }).catch(function (error){
            console.log(error);
        });
    }

    async function getSpesifikasi(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        axios.get("/api/getSpesifikasi?id_barang="+id)
        .then(function (response){
            
            color.setValue(response.data[0].color);
            frame.setValue(response.data[0].frame);
            fork.setValue(response.data[0].fork);
            shiftter.setValue(response.data[0].shifter);
            rd.setValue(response.data[0].rd);
            brake.setValue(response.data[0].brake);
            freewheel.setValue(response.data[0].freewheel);
            pedal.setValue(response.data[0].pedal);
            crankset.setValue(response.data[0].crankset);
            bb.setValue(response.data[0].bb);
            chain.setValue(response.data[0].chain);
            fh.setValue(response.data[0].fh);
            rh.setValue(response.data[0].rh);
            spokes.setValue(response.data[0].spokes);
            rim.setValue(response.data[0].rim);
            saddle.setValue(response.data[0].saddle);
            stem.setValue(response.data[0].stem);
            seatpost.setValue(response.data[0].seatpost);
            handlebar.setValue(response.data[0].handlebar);
            tires.setValue(response.data[0].tires);

        }).catch(function (error){
            console.log(error);
        });
    }

    function displayImage(){
        if (detail_barang.gambar != undefined){
            return(
                <SideBySideMagnifier imageSrc={"/product/"+detail_barang.gambar} className="w-100" alwaysInPlace="true" style={{ marginLeft:"auto", marginRight:"auto"}}/>
            );
        }
    }

    const addTOCart = (e) => {
        //alert(gambarLama.value);
        e.preventDefault();
        var obj = {
            id_barang : getIDBarang(),
            jumlah : 1,
            harga : hargaBarang.value,
            gambar : gambarLama.value,
            nama : namaBarang.value
        };
        let tmp = window.sessionStorage.getItem("cart")
        let tmp_arr = []
        if(!tmp){
            tmp_arr.push(obj)
        } else {
            tmp_arr = JSON.parse(tmp)
            let ada = false
            for(let i = 0; i < tmp_arr.length; i++){
                if(tmp_arr[i].id_barang === obj.id_barang){
                    ada = true
                    tmp_arr[i].jumlah = Number(tmp_arr[i].jumlah) + Number(obj.jumlah)
                }
            }
            if(!ada) tmp_arr.push(obj)
        }
        window.sessionStorage.setItem("cart",JSON.stringify(tmp_arr))
        console.log(tmp_arr)
        alert("sukses tambah ke cart");
    }

    useEffect(() => {
        
        getDetailBarang();
        getSpesifikasi();
        
    }, []);

    function beli(){
        if (window.sessionStorage.getItem("email") == undefined){
            return(
                <React.Fragment>
                    <button className="btn btn-success mt-3" disabled>ADD TO CART</button>
                    <p className="text-muted">Silahkan login terlebih dahulu</p>
                </React.Fragment>
                
            );
        } else {
            return(
                <React.Fragment>
                    <button className="btn btn-success mt-3" onClick={(e) => addTOCart(e)}>ADD TO CART</button>
                    
                </React.Fragment>
                
            );
        }
    }

    return (
        <React.Fragment>
            <NavBar/>
            <div className="container">
                <h2>Welcome to {namaBarang.value}</h2>
                <div className="row">
                    <div className="col-6">{displayImage()}</div>
                    <div className="col-6">
                        <p style={{fontSize:"5vh"}}>{namaBarang.value}</p>
                        <p style={{fontSize:"2vh"}}>{deskripsiBarang.value}</p>
                        <NumberFormat className="w-100" style={{fontSize:"3vh", color:"black"}} value={hargaBarang.value} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                        <br/>
                        {beli()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Detail;