import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'

const Catagory = () => {
    const [katagori, setKatagori] = useState([]);
    async function getDataKatagoriFromAPI(){
        try {
            const data = await fetch("/api/getKatagori", {method : "GET"});
            setKatagori(await data.json());
        } catch (error) {
            console.log("gagal");
            console.log(error);
        }
    }

    useEffect(()=>{
        getDataKatagoriFromAPI();
    },[])

    const deleteCatagory = (e, id_katagori) => {
        e.preventDefault();
        //console.log(id_katagori);
        axios.delete("/api/deleteCategory?id=" + id_katagori)
        .then(function (response){
            console.log(response);
            alert(response.data.message);
            getDataKatagoriFromAPI();
        })
        .catch(function (error){
            console.log(error);
        })
    }

    const onSubmitCatagory = (e) => {
        e.preventDefault();
        const katagori = document.getElementById("katagori").value;
        const deskripsi = document.getElementById("deskripsi").value;

        if (katagori === "" || deskripsi === ""){
            alert("Pastikan semua field sudah terisi");
        } else {
            try {
                axios.post('/api/addCategory', {
                    nama: katagori,
                    deskripsi: deskripsi
                })
                .then(function (response) {
                    console.log(response);
                    alert(response.data.message);
                    getDataKatagoriFromAPI();
                    document.getElementById("katagori").value = "";
                    document.getElementById("deskripsi").value = "";
                })
                .catch(function (error) {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-5">
                    <h3 className="text-center">Input Catagory</h3>
                    <form onSubmit={(e) => onSubmitCatagory(e)}>
                        <div class="form-group">
                            <label for="namaProduk">Katagori Produk</label>
                            <input type="text" class="form-control" id="katagori" placeholder="Nama Katagori"></input>
                        </div>
                        <div class="form-group">
                            <label for="namaProduk">Deskripsi Produk</label>
                            <textarea class="form-control" id="deskripsi" placeholder="Deskripsi Katagori"></textarea>
                        </div>
                        <input type="submit" value="INPUT" className="btn btn-success"/>
                    </form>
                </div>
                <div className="col-7">
                    <h3 className="text-center">List Katagori Barang</h3>
                    <table className="table table-bordered">   
                        <thead>
                            <tr>
                                <th>Nama Katagori</th>
                                <th>Deskripsi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {katagori.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.nama_katagori}</td>
                                        <td>{item.deskripsi}</td>
                                        <td><button className="btn btn-danger" id={item.id_katagori} onClick={(e) => deleteCatagory(e, item.id_katagori)}>DELETE</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    );
}

export default Catagory;