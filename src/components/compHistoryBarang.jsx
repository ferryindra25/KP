import React from 'react';

const CompHistoryBarang = (props) => {

   const namaBarang = props.nama;
   const harga = props.harga;
   const gambar = props.gambar;
   const qty = props.qty;
   const id = props.id;

   return(
      <div className="row">
         
         <div className="col-6" style={{borderRight : "1px solid #cfcfcf"}}>
            <div className="row">
               <div className="col-auto">
                  <img src={"/product/" + gambar} width="150px" height="120px" alt="items"/>
               </div>
               <div className="col-8" style={{paddingLeft : "0px"}}>
                  <h6 className="card-subtitle mt-0" style={{color : "#0389B1"}}>{namaBarang}</h6>
                  <p style={{color : "#ff5500", marginBottom : "0px"}}>Rp. {harga}</p>
                  <p style={{marginBottom : "0px"}}>kuantitas : {qty}</p>
               </div>
            </div>
            
         </div>
         <div className="col-6">
            <h4>Total Harga Produk</h4>
            <h5 style={{color : "#ff5500", marginBottom : "0px"}}>Rp. {harga * qty}</h5>
            <p className="text-muted">Pembelian {qty} barang</p>
         </div>
         <div className="col-12">
            <hr/>
         </div>
      </div>
      
   );
}

export default CompHistoryBarang;