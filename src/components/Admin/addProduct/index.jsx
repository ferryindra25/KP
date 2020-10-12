import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'

const AddProduct = () => {

    const [katagori, setKatagori] = useState([]);

    const useFormInput = (initialvalue) => {
        const [value, setValue] = useState(initialvalue);
        const handleChange = (e) => {
            setValue(e.target.value);
        };
        return { value, onChange: handleChange, setValue };
    };

    const namaBarang = useFormInput("");
    const katagoriBarang = useFormInput("");
    const deskripsiBarang = useFormInput("");
    const hargaBarang = useFormInput("");
    const [gambarBarang, setGambarBarang] = useState();

    const Produkk = {
        nama_barang : namaBarang.value,
        deskripsi : deskripsiBarang.value,
        harga_barang : hargaBarang.value,
        gambar : gambarBarang
    }

    function gambarChange(e){
        setGambarBarang(e.target.files[0]);
    }

    const onSubmitProduct = async (e, Produk) => {
        e.preventDefault();
        var id_katagori = document.getElementById("katagori").value;

        var color = document.getElementById("color").value;
        var frame = document.getElementById("frame").value;
        var fork = document.getElementById("fork").value;
        var shifter = document.getElementById("shifter").value;
        var rd = document.getElementById("rd").value;
        var brake = document.getElementById("brake").value;
        var freewheel = document.getElementById("freewheel").value;
        var pedal = document.getElementById("pedal").value;
        var crankset = document.getElementById("crankset").value;
        var bb = document.getElementById("bb").value;
        var chain = document.getElementById("chain").value;
        var fh = document.getElementById("fh").value;
        var rh = document.getElementById("rh").value;
        var spokes = document.getElementById("spokes").value;
        var rim = document.getElementById("rim").value;
        var tires = document.getElementById("tires").value;
        var saddle = document.getElementById("saddle").value;
        var stem = document.getElementById("stem").value;
        var seatpost = document.getElementById("seatpost").value;
        var handlebar = document.getElementById("handlebar").value;

        if (Produk.nama_barang === "" || Produk.deskripsi === "" || Produk.harga_barang === "" || Produk.gambar === ""){
            alert("Pastikan semua field sudah terisi");
        } else {
            try {
                let bodyFormData = new FormData()
                bodyFormData.append("id_katagori",id_katagori);
                bodyFormData.append("nama_barang",Produk.nama_barang);
                bodyFormData.append("deskripsi",Produk.deskripsi);
                bodyFormData.append("harga_barang",Produk.harga_barang);
                bodyFormData.append('gambar',Produk.gambar);
                axios({
                    method: 'post',
                    url: "/api/addProduct",
                    data: bodyFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                }).then(function (response) {
                    //handle success
                    console.log(response);
                    console.log(response.data.data.insertId);
                    axios.post('/api/addSpesifikasi', {
                        id_barang : response.data.data.insertId,
                        color : color,
                        frame : frame,
                        fork : fork,
                        shifter : shifter,
                        rd : rd,
                        brake : brake,
                        freewheel : freewheel,
                        pedal : pedal,
                        crankset : crankset,
                        bb : bb,
                        chain : chain,
                        fh : fh,
                        rh : rh,
                        spokes : spokes,
                        rim : rim,
                        tires : tires,
                        saddle : saddle,
                        stem : stem,
                        seatpost : seatpost,
                        handlebar : handlebar
                    }).then(function (response2) {
                        console.log(response2);
                        alert("Berhasil input barang");
                        namaBarang.setValue("");
                        deskripsiBarang.setValue("");
                        hargaBarang.setValue("");
                        setGambarBarang("");
                    }).catch(function (error2) {
                        console.log(error2);
                    })
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    
                });
                
            } catch (error) {
                console.log(error);
            }
            
        }
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

    useEffect(() => {
        getDataKatagoriFromAPI();
        
    }, []);

    return(
        //<div className="container">
            //<div className="row">
                <div className="col-10">
                    
                    <form onSubmit={(e) => onSubmitProduct(e, Produkk)} enctype="multipart/form-data">
                        <h3>Detail Produk</h3>
                        <div class="form-group">
                            <label for="namaProduk">Nama Produk</label>
                            <input type="text" class="form-control" id="namaProduk" placeholder="Nama Produk" value={namaBarang.value} onChange={namaBarang.onChange}></input>
                        </div>
                        <div class="form-group">
                            <label for="katagori">Katagori Produk</label>
                            <select class="form-control" id="katagori">
                                {katagori.map((item, index) => {
                                    return (
                                        <option value={item.id_katagori}>{item.nama_katagori}</option>
                                    );
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
                            <input type="text" class="form-control" id="color" placeholder="Color"></input>
                        </div>
                        <div class="form-group">
                            <label for="frame">Frame</label>
                            <input type="text" class="form-control" id="frame" placeholder="Frame"></input>
                        </div>
                        <div class="form-group">
                            <label for="fork">Fork</label>
                            <input type="text" class="form-control" id="fork" placeholder="Fork"></input>
                        </div>
                        <div class="form-group">
                            <label for="shifter">Shifter</label>
                            <input type="text" class="form-control" id="shifter" placeholder="Shiftter"></input>
                        </div>
                        <div class="form-group">
                            <label for="rd">Rear Derailleur</label>
                            <input type="text" class="form-control" id="rd" placeholder="Rear Derailleur"></input>
                        </div>
                        <div class="form-group">
                            <label for="brake">F/R Brakes</label>
                            <input type="text" class="form-control" id="brake" placeholder="F/R Brakes"></input>
                        </div>
                        <div class="form-group">
                            <label for="freewheel">Free Wheel</label>
                            <input type="text" class="form-control" id="freewheel" placeholder="Free Wheel"></input>
                        </div>
                        <div class="form-group">
                            <label for="pedal">Pedal</label>
                            <input type="text" class="form-control" id="pedal" placeholder="Pedal"></input>
                        </div>
                        <div class="form-group">
                            <label for="crankset">Crankset</label>
                            <input type="text" class="form-control" id="crankset" placeholder="Crankset"></input>
                        </div>
                        <div class="form-group">
                            <label for="bb">Bottom Bracket</label>
                            <input type="text" class="form-control" id="bb" placeholder="Bottom Bracket"></input>
                        </div>
                        <div class="form-group">
                            <label for="chain">Chain</label>
                            <input type="text" class="form-control" id="chain" placeholder="Chain"></input>
                        </div>
                        <div class="form-group">
                            <label for="fh">Front Hub</label>
                            <input type="text" class="form-control" id="fh" placeholder="Front Hub"></input>
                        </div>
                        <div class="form-group">
                            <label for="rh">Rear Hub</label>
                            <input type="text" class="form-control" id="rh" placeholder="Rear Hub"></input>
                        </div>
                        <div class="form-group">
                            <label for="spokes">Spokes</label>
                            <input type="text" class="form-control" id="spokes" placeholder="Spokes"></input>
                        </div>
                        <div class="form-group">
                            <label for="rim">Rim</label>
                            <input type="text" class="form-control" id="rim" placeholder="Rim"></input>
                        </div>
                        <div class="form-group">
                            <label for="tires">Tires</label>
                            <input type="text" class="form-control" id="tires" placeholder="Tires"></input>
                        </div>
                        <div class="form-group">
                            <label for="saddle">Saddle</label>
                            <input type="text" class="form-control" id="saddle" placeholder="Saddle"></input>
                        </div>
                        <div class="form-group">
                            <label for="stem">Stem</label>
                            <input type="text" class="form-control" id="stem" placeholder="Stem"></input>
                        </div>
                        <div class="form-group">
                            <label for="seatpost">Seatpost</label>
                            <input type="text" class="form-control" id="seatpost" placeholder="Seatpost"></input>
                        </div>
                        <div class="form-group">
                            <label for="handlebar">Handlebar</label>
                            <input type="text" class="form-control" id="handlebar" placeholder="Handlebar"></input>
                        </div>
                        <input type="submit" value="submit" className="btn btn-primary"/>
                    </form>
                </div>
                
            //</div>
        //</div>
        
    );
}

export default AddProduct;