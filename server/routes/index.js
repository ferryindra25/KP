const express = require("express");
const connection = require("../connection")
const router = express.Router();
var multer = require("multer");
var path = require("path");

router.get("/getAllCustomer", async (req, res) => {
    
    var q = `select * from customer`;
    const data = await connection.query(q);
    
    res.json(data);
});

router.get("/getCustomerEmail", async (req, res) => {
    
    var email = req.query.email;
    var q = `select * from customer where email_customer = '${email}'`;
    const data = await connection.query(q);
    
    res.json(data);
});


router.post("/registerCustomer", async (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var nama = req.body.nama;
    var alamat = req.body.alamat;
    var telp = req.body.telp;

    var q1 = `select * from customer where email_customer = '${email}'`;
    const data = await connection.query(q1);

    if (data.length > 0){
        res.status(400).json({message : "email sudah di pakai"});
    } else {
        var q = "INSERT INTO `customer` (`id_customer`, `email_customer`, `password`, `nama_customer`, `alamat_customer`, `telp_customer`, `status`)" + 
                `VALUES (NULL, '${email}', '${password}', '${nama}', '${alamat}', '${telp}', '0')`;
        try {
            const hasil = await connection.query(q)
            //console.log(hasil)
            if(hasil.affectedRows > 0 ){
                res.status(200).send({status:"success",message:"Register berhasil !"})
            } else {
                res.status(400).send({status:"fail",message:"Register gagal"})
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
});




module.exports = router;
