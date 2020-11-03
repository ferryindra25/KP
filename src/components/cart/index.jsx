import React, { Component, useState, useEffect } from 'react';
import Navbar from "../NavBar";
import axios from "axios";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './index.css';
import formInput from "../Admin/formInput";
import { ReplayOutlined } from '@material-ui/icons';

const Cart = () => {
    var [tmp, setTmp] = useState([]);
    var totalBelanja = 0;
    var catatan = formInput("");
    useEffect(()=>{
        getCartData();
    },[])
    function getCartData(){
        setTmp(JSON.parse(window.sessionStorage.getItem("cart")));
        
    }
    const placeOrder = (e) => {
        e.preventDefault();
        
        var token = window.sessionStorage.getItem("token");
        var tanggal = document.getElementById("tanggal").value;
        //console.log(tanggal);
        if (new Date(tanggal) < Date.now()){
            alert("Tanggal salah");
        } else {
            axios.post('/api/placeOrder', {
                token : token, 
                pesanan : tmp, 
                total : totalBelanja,
                catatan : catatan.value,
                tanggal : tanggal
            }).then(function (response2) {
                window.sessionStorage.removeItem("cart");
                alert("pesanan anda berhasil terinput");
                checkCart();
                window.location.reload();
            }).catch(function (error2) {
                console.log(error2)
                alert(error2.response);
            })
        }
    }
    const plus = (e, index) => {
        e.preventDefault();
        var tmp_arr = tmp;
        tmp_arr[index].jumlah++;
        window.sessionStorage.setItem("cart",JSON.stringify(tmp_arr));
        getCartData();
    }

    const minus = (e, index) => {
        e.preventDefault();
        var tmp_arr = tmp;
        if (tmp_arr[index].jumlah > 1){
            tmp_arr[index].jumlah--;
            window.sessionStorage.setItem("cart",JSON.stringify(tmp_arr));
            getCartData();
        } else {
            tmp_arr.splice(index, 1);
            window.sessionStorage.setItem("cart",JSON.stringify(tmp_arr));
            getCartData();
        }
        
    }
    function cetakCart(){
        
        var hasil = [];
        for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i];
            totalBelanja += element.harga * element.jumlah;
            hasil.push(
                <tr>
                    <td>#{i+1}</td>
                    <td><img className="cartproduct" src={ "/product/"+element.gambar } />
                        <p style={{marginTop:"5%",marginLeft:"30%"}}>{element.nama}</p>
                        <p style={{marginLeft:"30%", fontWeight:"bold"}}>{element.harga}</p>
                    </td>
                    <td>
                        <span onClick={(e) => minus(e, i)}>&#60;</span> &nbsp; <input className="qty" type="text" placeholder={element.jumlah} disabled></input> &nbsp; <span onClick={(e) => plus(e, i)}>&#62;</span>
                    </td>
                    <td style={{fontWeight:"bold"}}>{element.harga * element.jumlah}</td>
                    
                </tr>
            );
        }
        return hasil;
    }
    function checkCart() {
        if (window.sessionStorage.getItem("cart") == undefined){
            return(
                <p>Keranjang Belanja anda kosong</p>
            );
        } else {
            
            return(
                <div class="row" style={{fontFamily:"calibri"}}>
                    <div class="col-8">
                        <table style={{fontSize:"20px"}} className="table ">
                            <br/>
                            <tr>
                                <th>NO</th>
                                <th>PRODUCT</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                                    
                            </tr>
                            {
                                cetakCart()
                            }
                        </table>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <br/>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3>Total Keranjang Belanja</h3>
                                <hr/>
                                Total Belanja : {totalBelanja}
                                <hr/>
                                <label>Catatan Pesanan</label>
                                <textarea id="catatan" cols="30" rows="5" className="form-control" id="catatan" value={catatan.value} onChange={catatan.onChange}></textarea>
                                <label>Tanggal Pengambilan Barang</label>
                                <input type="date" id="tanggal" className="form-control"/>
                                <button className="btn btn-success mt-3" onClick={(e) => placeOrder(e)}>Submit</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    return(
        <React.Fragment>
            <Navbar></Navbar>
            <div className="container-fluid w-80">
                <h3 className="w-100 mt-3">Keranjang Belanja</h3>
                {checkCart()}
                
            </div>
        </React.Fragment>
        
    );
}

export default Cart;