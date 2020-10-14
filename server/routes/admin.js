const express = require("express");
const path = require("path");
const multer = require("multer");
const connection = require("../connection");

const app = express.Router();
const fs = require('fs');

app.use("/public/product/", express.static("./public/product"));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/product");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage
}).single('gambar');

app.get("/getKatagori", async (req, res) => {
    var q = "select * from katagori";
    const data = await connection.query(q);
    
    res.json(data);
});

app.post("/addCategory", async (req, res) => {
    var nama_kategori = req.body.nama;
    var deskripsi = req.body.deskripsi;

    var q = `INSERT INTO katagori (id_katagori, nama_katagori, deskripsi) VALUES (NULL, '${nama_kategori}', '${deskripsi}')`
    console.log(q);
    try {
        const hasil = await connection.query(q)
        //console.log(hasil)
        if(hasil.affectedRows > 0 ){
            res.status(200).send({status:"success",message:"Tambah katagori berhasil !"})
        } else {
            res.status(400).send({status:"fail",message:"Tambah katagori gagal"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
});

app.delete("/deleteCategory", async (req, res) => {
    var id_category = req.query.id;

    var qq = `select * from barang where id_katagori = ${id_category}`;
    console.log(qq);
    const cek = await connection.query(qq);
    if (cek.length > 0){
        res.status(200).send({status:"fail",message:"Gagal hapus katagori masih ada barang dengan katagori tersebut"});
    } else {
        var q = `delete from katagori where id_katagori = ${id_category}`;
        console.log(q);
        try {
            const hasil = await connection.query(q)
            //console.log(hasil)
            if(hasil.affectedRows > 0 ){
                res.status(200).send({status:"success",message:"Hapus katagori berhasil !"})
            } else {
                res.status(200).send({status:"fail",message:"Hapus katagori gagal"})
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
});


app.post("/addProduct", async (req, res) => {
    
    upload(req, res, async (err) => {
        var id_category = req.body.id_katagori;
        var nama_barang = req.body.nama_barang;
        var deskripsi = req.body.deskripsi;
        var harga_barang = req.body.harga_barang;
        
        if (err) {
            console.log(err);
        } else {
            if (req.file == undefined){
                console.log("gambar belum dipilih");
                res.send("gambar belum dipilih");
                
            } else {
                
                var gambar = req.file.filename;
                var q = `INSERT INTO barang (id_barang, id_katagori, nama_barang, deskripsi, harga_barang, status, gambar) VALUES (NULL, ${id_category}, '${nama_barang}', '${deskripsi}', ${harga_barang}, '0', '${gambar}')`;
                console.log(q);

                try {
                    const hasil = await connection.query(q)
                    
                    if(hasil.affectedRows > 0 ){
                        res.status(200).send({status:"success",message:"Insert barang berhasil !", data:hasil})
                    } else {
                        res.status(400).send({status:"fail",message:"Insert barang gagal"})
                    }
                    
                } catch (error) {
                    res.status(500).send(error)
                }
            }
        }
    });
});

app.post("/addSpesifikasi", async (req, res) => {
    var id_barang = req.body.id_barang;
    var color = req.body.color;
    var frame = req.body.frame;
    var fork = req.body.fork;
    var shifter = req.body.shifter;
    var rd = req.body.rd;
    var brake = req.body.brake;
    var freewheel = req.body.freewheel;
    var pedal = req.body.pedal;
    var crankset = req.body.crankset;
    var bb = req.body.bb;
    var chain = req.body.chain;
    var fh = req.body.fh;
    var rh = req.body.rh;
    var spokes = req.body.spokes;
    var rim = req.body.rim;
    var tires = req.body.tires;
    var saddle = req.body.saddle;
    var stem = req.body.stem;
    var seatpost = req.body.seatpost;
    var handlebar = req.body.handlebar;

    var q = `INSERT INTO spesifikasi (id_barang, color, frame, fork, shifter, rd, brake, freewheel, pedal, crankset, bb, chain, fh, rh, spokes, rim, tires, saddle, stem, seatpost, handlebar) VALUES (${id_barang}, '${color}', '${frame}', '${fork}', '${shifter}', '${rd}', '${brake}', '${freewheel}', '${pedal}', '${crankset}', '${bb}', '${chain}', '${fh}', '${rh}', '${spokes}', '${rim}', '${tires}', '${saddle}', '${stem}', '${seatpost}', '${handlebar}')`;
    try {
        const hasil = await connection.query(q)
        
        if(hasil.affectedRows > 0 ){
            res.status(200).send({status:"success",message:"Insert spesifikasi berhasil !"})
        } else {
            res.status(400).send({status:"fail",message:"Insert spesifikasi gagal"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post("/login", async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var q = `select * from customer where email_customer = '${email}' and password = '${password}'`;

    var hasil = await connection.query(q);

    if (hasil.length > 0){
        console.log(hasil);
        res.status(200).send(hasil)
    } else {
        res.status(400).send({message : "Email/password anda salah"})
    }
});

app.get("/getBarang", async (req, res) => {
    var q = "select * from barang";
    var hasil = await connection.query(q);
    res.json(hasil);
});

app.get("/getBarangbyKatagori", async (req, res) => {
    var id_Katagori = req.query.id_katagori;
    var q = `select * from barang where id_katagori=${id_Katagori}`;
    var hasil = await connection.query(q);
    res.json(hasil);
});

app.get("/getSpesifikasi", async (req, res) => {
    var id_barang = req.query.id_barang;
    var q = `select * from spesifikasi where id_barang = ${id_barang}`;
    var hasil = await connection.query(q);
    res.json(hasil);
});

app.get("/getBarangByID", async (req, res) => {
    var id_barang = req.query.id_barang;
    var q = `select * from barang where id_barang = ${id_barang}`;
    var hasil = await connection.query(q);
    res.json(hasil);
});

app.post("/updateBarang", (req, res) => {

    upload(req, res, async (err) => {
        var gambarLama = req.body.gambarLama;

        var id_barang = req.body.id_barang;
        var id_katagori = req.body.id_katagori;
        var nama_barang = req.body.nama_barang;
        var deskripsi = req.body.deskripsi;
        var harga_barang = req.body.harga_barang;

        var color = req.body.color;
        var frame = req.body.frame;
        var fork = req.body.fork;
        var shifter = req.body.shifter;
        var rd = req.body.rd;
        var brake = req.body.brake;
        var freewheel = req.body.freewheel;
        var pedal = req.body.pedal;
        var crankset = req.body.crankset;
        var bb = req.body.bb;
        var chain = req.body.chain;
        var fh = req.body.fh;
        var rh = req.body.rh;
        var spokes = req.body.spokes;
        var rim = req.body.rim;
        var tires = req.body.tires;
        var saddle = req.body.saddle;
        var stem = req.body.stem;
        var seatpost = req.body.seatpost;
        var handlebar = req.body.handlebar;

        if (req.file == undefined){
            //gambar tidak diganti
            console.log("gambar belum dipilih");
            //res.send("gambar belum dipilih");
            var q = `update barang set id_katagori=${id_katagori}, nama_barang='${nama_barang}', deskripsi='${deskripsi}', harga_barang=${harga_barang} where id_barang=${id_barang}`;
            console.log(q);
            try {
                const hasil = await connection.query(q)
                
                /*if(hasil.affectedRows > 0 ){
                    res.status(200).send({status:"success",message:"Update barang berhasil dilakukan"})
                } else {
                    res.status(400).send({status:"fail",message:"Insert spesifikasi gagal"})
                }*/
                
            } catch (error) {
                res.status(500).send(error)
            }
        } else {
            //gambar diganti
            try {
                fs.unlinkSync('./public/product/'+gambarLama);
                console.log("sukses hapus gambar lama");
            } catch (err) {
                console.log(err);
            }
            var gambar = req.file.filename;
            var q = `update barang set id_katagori=${id_katagori}, nama_barang='${nama_barang}', deskripsi='${deskripsi}', harga_barang=${harga_barang}, gambar='${gambar}' where id_barang=${id_barang}`;
            console.log(q);
            try {
                const hasil = await connection.query(q)
                
                /*if(hasil.affectedRows > 0 ){
                    res.status(200).send({status:"success",message:"Update barang berhasil dilakukan"})
                } else {
                    res.status(400).send({status:"fail",message:"Insert spesifikasi gagal"})
                }*/
                
            } catch (error) {
                res.status(500).send(error)
            }
        }

        var qq = `update spesifikasi set
                    color='${color}',
                    frame='${frame}',
                    fork='${fork}',
                    shifter='${shifter}',
                    rd='${rd}',
                    brake='${brake}',
                    freewheel='${freewheel}',
                    pedal='${pedal}',
                    crankset='${crankset}',
                    bb='${bb}',
                    chain='${chain}',
                    fh='${fh}',
                    rh='${rh}',
                    spokes='${spokes}',
                    rim='${rim}',
                    tires='${tires}',
                    saddle='${saddle}',
                    stem='${stem}',
                    seatpost='${seatpost}',
                    handlebar='${handlebar}' 
                    where id_barang = '${id_barang}'`;
        console.log(qq);
        try {
            const hasil = await connection.query(qq)
                
            if(hasil.affectedRows > 0 ){
                res.status(200).send({status:"success",message:"Update barang berhasil dilakukan"})
            } else {
                res.status(400).send({status:"fail",message:"Insert spesifikasi gagal"})
            }
                
        } catch (error) {
            res.status(500).send(error)
        }
        
    });
    
});

module.exports = app;
