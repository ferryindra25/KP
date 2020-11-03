import React, { useState, useEffect } from 'react';
import CompHistoryBarang from './compHistoryBarang';
import axios from "axios";
const CompHistory = (props) =>{
   const tgl = props.tgl;
   const id = props.id;
   const nama = props.nama;
   const status = props.status;
   const catatan = props.catatan;
   const tglPengambilan = props.tgl_pengambilan;
   
   const [items, setItems] = useState([]);
   async function getItems(){
      try {
         const data = await fetch(`/api/getDtrans?id_trans=${id}`, {method : "GET"});
         let obj = await data.json();
         console.log(obj);
         setItems(obj);
         
         
      } catch (error) {
         console.log("gagal");
         console.log(error);
      }
   }
   useEffect( () => {
      getItems();
   },[id]);

   const prosesOrder = (e) => {
      axios.post('/api/prosesOrder', {
         id:id
      }).then(function (response2) {
         alert("berhasil terima pesanan");
         props.transAPI();
      }).catch(function (error2) {
         console.log(error2)
         alert(error2.response);
      })
   }

   const pesananSiapDiambil = (e) => {
      axios.post('/api/siapDiambil', {
         id:id
      }).then(function (response2) {
         alert("berhasil proses pesanan");
         props.transAPI();
      }).catch(function (error2) {
         console.log(error2)
         alert(error2.response);
      })
   }

   const orderSelesai = (e) => {
      axios.post('/api/orderSelesai', {
         id:id
      }).then(function (response2) {
         alert("berhasil selesaikan pesanan");
         props.transAPI();
      }).catch(function (error2) {
         console.log(error2)
         alert(error2.response);
      })
   }

   function renderButton(){
      if (status == 0){
         return(
            <button className="btn btn-success" onClick={(e) => prosesOrder(e)}>Proses Order</button>
         );
      } else if (status == 1){
         return(
            <button className="btn btn-primary" onClick={(e) => pesananSiapDiambil(e)}>Pesanan siap diambil</button>
         );
      } else if (status == 2){
         return(
            <button className="btn btn-success" onClick={(e) => orderSelesai(e)}>Order selesai</button>
         );
      }
   }
   

   const tStatus = ["Order Belum Dibaca", "Order Disiapkan", "Barang Siap diambil", "Order selesai"]
   const bulan   = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Ags", "Sep", "Oct", "Nov", "Dec"];
   const date    = tgl.getDate();
   const month   = tgl.getMonth();
   const year    = tgl.getFullYear();

   const date2    = tglPengambilan.getDate();
   const month2   = tglPengambilan.getMonth();
   const year2    = tglPengambilan.getFullYear();

   return (
      <div className="mt-3" style={{padding : "10px 10px 10px 20px", border : "1px solid #cfcfcf", borderRadius : "10px", boxShadow: "1px 1px 10px #f2f2f2"}}>
         <p className="text-muted mb-2">{date} {bulan[month]} {year}</p>
         <hr className="mt-0"/>
         <div className="row">
            <div className="col-3" style={{borderRight : "1px solid #cfcfcf"}}>
               <p className="text-muted mb-0">Nomor Pesanan : {id}</p>
               <h5 className="card-subtitle mt-1" style={{color : "#0389B1"}}>{nama}</h5>
               
            </div>
            <div className="col-2" style={{borderRight : "1px solid #cfcfcf"}}>
               <p className="text-muted mb-0">Status Trankasi</p>
               <h6 className="card-subtitle mt-1">{tStatus[status]}</h6>
            </div>
            <div className="col-4" style={{borderRight : "1px solid #cfcfcf"}}>
               <p className="text-muted mb-0">Catatan</p>
               <h6 className="card-subtitle mt-1">{catatan}</h6>
            </div>
            <div className="col-auto">
               <p className="text-muted mb-0">Tanggal Pengambilan</p>
               <h6 className="card-subtitle mt-1">{date2} {bulan[month2]} {year2}</h6>
            </div>
            
         </div>
         <hr/>
         {
            items.map((item) => {
               
               return (
                  <CompHistoryBarang id={id} nama={item.nama_barang} gambar={item.gambar} harga={item.harga} qty={item.qty}></CompHistoryBarang>
               )
            })
            
         }
         <div className="text-right">
            {renderButton()}
         </div>
      </div>
   )
}

export default CompHistory; 