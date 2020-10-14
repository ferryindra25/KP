import React, { Component, useEffect, useState } from 'react';
import SideNav from "../SideNavigation";
import axios from "axios";
import { SideBySideMagnifier } from "react-image-magnifiers";
import useFormInput from "../formInput";

const DetailProduk = () => {
    var id_barang;
    var [detail_barang, setDetail_barang] = useState([]);
    var [katagori, setKatagori] = useState([]);
    var [spesifikasi, setSpesifikasi] = useState([]);
    const [gambarBarang, setGambarBarang] = useState();

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


    useEffect(() => {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        id_barang = id;
        getDetailBarang();
        getSpesifikasi();
        getDataKatagoriFromAPI();
    }, []);

    

    async function getSpesifikasi(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        axios.get("/api/getSpesifikasi?id_barang="+id)
        .then(function (response){
            setSpesifikasi(response.data[0]);
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

    async function getDetailBarang(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        axios.get("/api/getBarangByID?id_barang="+id)
        .then(function (response){
            setDetail_barang(response.data[0]);
            namaBarang.setValue(response.data[0].nama_barang);
            deskripsiBarang.setValue(response.data[0].deskripsi);
            hargaBarang.setValue(response.data[0].harga_barang);
            gambarLama.setValue(response[0].data.gambar);
        }).catch(function (error){
            console.log(error);
        });
    }

    async function getDataKatagoriFromAPI(){
        try {
            const data = await fetch("/api/getKatagori", {method : "GET"});
            setKatagori(await data.json());
        } catch (error) {
            console.log("gagal");
            console.log(error);
        }
    }

    function displayImage(){
        if (detail_barang.gambar != undefined){
            
            return(
                <SideBySideMagnifier imageSrc={"/product/"+detail_barang.gambar} className="w-50" alwaysInPlace="true" style={{ marginLeft:"auto", marginRight:"auto"}}/>
            );
        }
    }

    function gambarChange(e){
        setGambarBarang(e.target.files[0]);
    }

    const onClickUpadate = (e) =>{
        e.preventDefault();
        var id_katagori = document.getElementById("katagori").value;
        
        if (namaBarang.value === "" || deskripsiBarang.value === "" || hargaBarang.value === ""){
            alert("Pastikan semua field detail barang sudah terisi");
        } else {
            try {
                var url_string = window.location.href;
                var url = new URL(url_string);
                var id = url.searchParams.get("id");
                let bodyFormData = new FormData()
                bodyFormData.append("id_katagori",id_katagori);
                bodyFormData.append("id_barang",id);
                bodyFormData.append("nama_barang",namaBarang.value);
                bodyFormData.append("deskripsi",deskripsiBarang.value);
                bodyFormData.append("harga_barang",hargaBarang.value);
                bodyFormData.append('gambar',gambarBarang);
                bodyFormData.append('gambarLama',gambarLama.value);

                bodyFormData.append("color",color.value);
                bodyFormData.append("frame",frame.value);
                bodyFormData.append("fork",fork.value);
                bodyFormData.append("shifter",shiftter.value);
                bodyFormData.append("rd",rd.value);
                bodyFormData.append("brake",brake.value);
                bodyFormData.append("freewheel",freewheel.value);
                bodyFormData.append("pedal",pedal.value);
                bodyFormData.append("crankset",crankset.value);
                bodyFormData.append("bb",bb.value);
                bodyFormData.append("chain",chain.value);
                bodyFormData.append("fh",fh.value);
                bodyFormData.append("rh",rh.value);
                bodyFormData.append("spokes",spokes.value);
                bodyFormData.append("rim",rim.value);
                bodyFormData.append("tires",tires.value);
                bodyFormData.append("saddle",saddle.value);
                bodyFormData.append("stem",stem.value);
                bodyFormData.append("seatpost",seatpost.value);
                bodyFormData.append("handlebar",handlebar.value);
                axios({
                    method: 'post',
                    url: "/api/updateBarang",
                    data: bodyFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                }).then(function (response) {
                    console.log(response);
                    getDetailBarang();
                    getSpesifikasi();
                })
            } catch (error){
                console.log(error);
            }
        }
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="2-2"></SideNav>
                    
                    <div className="col-10 mt-3">
                        <h3>Detail Produk</h3>
                        <div className="w-100" style={{padding : "10px 10px 20px 10px", border : "1px solid #cfcfcf", borderRadius : "10px", boxShadow: "1px 1px 10px #f2f2f2"}}>
                            {displayImage()}
                            <form action="#">
                                <h3>Detail Produk</h3>
                                <div class="form-group">
                                    <label for="namaProduk">Nama Produk</label>
                                    <input type="text" class="form-control" id="namaProduk" placeholder="Nama Produk" value={namaBarang.value} onChange={namaBarang.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="katagori">Katagori Produk</label>
                                    <select class="form-control" id="katagori">
                                        {katagori.map((item, index) => {
                                            if (item.id_katagori == detail_barang.id_katagori){
                                                return (
                                                    <option value={item.id_katagori} selected="selected">{item.nama_katagori}</option>
                                                );
                                            } else {
                                                return (
                                                    <option value={item.id_katagori}>{item.nama_katagori}</option>
                                                );
                                            }
                                            
                                        })}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="deskripsiProduk">Deskripsi Produk</label>
                                    <textarea class="form-control" id="deskripsiProduk" placeholder="Deskripsi Produk" value={deskripsiBarang.value} onChange={deskripsiBarang.onChange}></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="hargaProduk">Harga Produk</label>
                                    <input type="number" class="form-control" id="hargaProduk" placeholder="Harga Produk" value={hargaBarang.value} onChange={hargaBarang.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="gambarProduk">Gambar Produk</label>
                                    <input type="file" name="gambar" class="form-control-file" id="gambarProduk" onChange={(e) => gambarChange(e)}></input>
                                </div>
                                <hr/>
                                <h3>Spesifikasi Produk</h3>
                                <div class="form-group">
                                    <label for="color">Color</label>
                                    <input type="text" class="form-control" id="color" placeholder="Color" value={color.value} onChange={color.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="frame">Frame</label>
                                    <input type="text" class="form-control" id="frame" placeholder="Frame" value={frame.value} onChange={frame.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="fork">Fork</label>
                                    <input type="text" class="form-control" id="fork" placeholder="Fork" value={fork.value} onChange={fork.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="shifter">Shiftter</label>
                                    <input type="text" class="form-control" id="shifter" placeholder="Shiftter" value={shiftter.value} onChange={shiftter.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="rd">Rear Derailleur</label>
                                    <input type="text" class="form-control" id="rd" placeholder="Rear Derailleur" value={rd.value} onChange={rd.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="brake">F/R Brakes</label>
                                    <input type="text" class="form-control" id="brake" placeholder="F/R Brakes" value={brake.value} onChange={brake.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="freewheel">Free Wheel</label>
                                    <input type="text" class="form-control" id="freewheel" placeholder="Free Wheel" value={freewheel.value} onChange={freewheel.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="pedal">Pedal</label>
                                    <input type="text" class="form-control" id="pedal" placeholder="Pedal" value={pedal.value} onChange={pedal.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="crankset">Crankset</label>
                                    <input type="text" class="form-control" id="crankset" placeholder="Crankset" value={crankset.value} onChange={crankset.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="bb">Bottom Bracket</label>
                                    <input type="text" class="form-control" id="bb" placeholder="Bottom Bracket" value={bb.value} onChange={bb.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="chain">Chain</label>
                                    <input type="text" class="form-control" id="chain" placeholder="Chain" value={chain.value} onChange={chain.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="fh">Front Hub</label>
                                    <input type="text" class="form-control" id="fh" placeholder="Front Hub" value={fh.value} onChange={fh.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="rh">Rear Hub</label>
                                    <input type="text" class="form-control" id="rh" placeholder="Rear Hub" value={rh.value} onChange={rh.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="spokes">Spokes</label>
                                    <input type="text" class="form-control" id="spokes" placeholder="Spokes" value={spokes.value} onChange={spokes.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="rim">Rim</label>
                                    <input type="text" class="form-control" id="rim" placeholder="Rim" value={rim.value} onChange={rim.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="tires">Tires</label>
                                    <input type="text" class="form-control" id="tires" placeholder="Tires" value={tires.value} onChange={tires.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="saddle">Saddle</label>
                                    <input type="text" class="form-control" id="saddle" placeholder="Saddle" value={saddle.value} onChange={saddle.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="stem">Stem</label>
                                    <input type="text" class="form-control" id="stem" placeholder="Stem" value={stem.value} onChange={stem.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="seatpost">Seatpost</label>
                                    <input type="text" class="form-control" id="seatpost" placeholder="Seatpost" value={seatpost.value} onChange={seatpost.onChange}></input>
                                </div>
                                <div class="form-group">
                                    <label for="handlebar">Handlebar</label>
                                    <input type="text" class="form-control" id="handlebar" placeholder="Handlebar" value={handlebar.value} onChange={handlebar.onChange}></input>
                                </div>
                                <button className="btn btn-primary mr-3" onClick={(e) => onClickUpadate(e)}>UPDATE</button>
                                <button className="btn btn-danger">DELETE</button>
                            </form>
                            
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default DetailProduk;