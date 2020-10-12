import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

const ListProduct = (props) => {
    const history = useHistory();
    const image = props.gambar;
    const nama = props.nama;
    const deskripsi = props.deskripsi;
    const harga = props.harga;
    const id = props.id;

    const onClickDetail = (e) =>{
        history.push("/admin/detailProduk?id="+id);
    }

    return (
        <div className="col-12" onClick={(e) => onClickDetail(e)}>
            <div className="mt-3" style={{padding : "10px 10px 10px 20px", border : "1px solid #cfcfcf", borderRadius : "10px", boxShadow: "1px 1px 10px #f2f2f2"}}>
                <h5 className="mb-2">{nama}</h5>
                <hr className="mt-0"/>
                <div className="row">
                    <div className="col-auto" style={{borderRight : "1px solid #cfcfcf"}}>
                        <img src={"/product/" + image} width="220px" height="130px" alt="items"/>
                    </div>
                    <div className="col-4" style={{borderRight : "1px solid #cfcfcf"}}>
                    <p className="text-muted mb-0">Deskripsi</p>
                    <h6 className="card-subtitle mt-1">{deskripsi}</h6>
                    </div>
                    <div className="col-auto">
                    <p className="text-muted mb-0">Harga</p>
                    <h6 className="card-subtitle mt-1 text-primary">{harga}</h6>
                    </div>
                    
                </div>
                <hr/>
            </div>
        </div>
    );
}

export default ListProduct;