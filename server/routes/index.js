const express = require("express");
const connection = require("../connection")
const router = express.Router();
var multer = require("multer");
var path = require("path");
const jwt = require("jsonwebtoken");

router.get("/getAllCustomer", async (req, res) => {
    
    var q = `select * from customer`;
    const data = await connection.query(q);
    
    res.json(data);
});

router.post("/login", async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var q = `select * from customer where email_customer = '${email}' and password = '${password}'`;

    var hasil = await connection.query(q);

    if (hasil.length > 0){
        //console.log(hasil[0].id_customer);
        var token = jwt.sign({
            email : email,
            id_customer : hasil[0].id_customer
        }, 'token');
        res.status(200).send({data : hasil, token : token});
    } else {
        res.status(400).send({message : "Email/password anda salah"})
    }
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
        var q = "INSERT INTO `customer` (`id_customer`, `email_customer`, `password`, `nama_customer`, `alamat_customer`, `telp_customer`, `status_customer`)" + 
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

router.post("/placeOrder", async (req, res) => {
    var token = req.body.token;
    var total = req.body.total;
    var catatan = req.body.catatan;
    var pesanan = req.body.pesanan;
    var tanggal = req.body.tanggal;
    //console.log(pesanan);
    
    if (!token) {
        return res.status(401).send("Token not found");
    }
    try {
        user = jwt.verify(token, "token");
    } catch (err) {
        return res.status(401).send("Token Invalid");
    }
    var id_customer = user.id_customer;
    var q1 = `INSERT INTO htrans (id_trans, id_customer, tgl_trans, total, status, catatan, tanggal_pengambilan) VALUES (NULL, ${id_customer}, NOW(), ${total}, 0, '${catatan}', STR_TO_DATE('${tanggal}', '%Y-%m-%d'))`
    console.log(q1);
    try {
        const hasil = await connection.query(q1)
        //console.log(hasil)
        if(hasil.affectedRows > 0 ){
            pesanan.forEach(async element => {
                var q2 = `INSERT INTO dtrans (id_trans, id_barang, qty, harga) VALUES (${hasil.insertId}, ${element.id_barang}, ${element.jumlah}, ${element.harga})`
                const hasil2 = await connection.query(q2)
            });
            res.status(200).send({status:"sucess",message:"Behasil Tersimpan"})
        } else {
            res.status(400).send({status:"fail",message:"Register gagal"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
    
});

router.get("/pesananAktif", async (req, res) => {
    var token = req.query.token;
    
    //console.log(pesanan);
    
    if (!token) {
        return res.status(401).send("Token not found");
    }
    try {
        user = jwt.verify(token, "token");
    } catch (err) {
        return res.status(401).send("Token Invalid");
    }
    var id_customer = user.id_customer;
    var q1 = `select * from htrans h, customer c where h.id_customer = c.id_customer and c.id_customer=${id_customer} and h.status < 3;`
    //console.log(q1);
    const data = await connection.query(q1);
    //console.log(data);
    res.json(data);
    
});
router.get("/historyPesanan", async (req, res) => {
    var token = req.query.token;
    
    //console.log(pesanan);
    
    if (!token) {
        return res.status(401).send("Token not found");
    }
    try {
        user = jwt.verify(token, "token");
    } catch (err) {
        return res.status(401).send("Token Invalid");
    }
    var id_customer = user.id_customer;
    var q1 = `select * from htrans h, customer c where h.id_customer = c.id_customer and c.id_customer=${id_customer} and h.status = 3;`
    //console.log(q1);
    const data = await connection.query(q1);
    //console.log(data);
    res.json(data);
    
});


module.exports = router;
