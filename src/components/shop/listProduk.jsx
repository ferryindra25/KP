import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
const ListProduk = (props) => {
    var history = useHistory();
    const image = props.gambar;
    const nama = props.nama;
    const deskripsi = props.deskripsi;
    const harga = props.harga;
    const id = props.id;
    const onClickDetail = (e) =>{
        
        history.push("/detail?id_barang="+id);
    }
    return (
        <div className="col-4" onClick={(e) => onClickDetail(e)}>
            <div className="h-100" style={{border : "1px solid #cfcfcf", boxShadow: "1px 1px 10px #f2f2f2", padding:"10px"}}>
                <img src={"/product/" + image} width="100%" alt="items"/>
                <h5 className="mt-3 text-center">{nama}</h5>
                <p className="card-subtitle mt-4 text-muted">{deskripsi}</p>
                <h5 className="mt-4 text-center">IDR {harga}</h5>
                
            </div>
        </div>
    );
}

export default ListProduk;