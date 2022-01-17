const express =require('express') //import (require) module express lalu simpan di const express
const router = express.Router() //instance object express untuk menjalankan route secara modular
const kambingcontroller = require('../controllers/kambing')// import data dari file kambing.js di folder controller
const Kambing = require('../models/kambing');
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

//tambahan 17 january
router.route('/kambing') //sintak app. ganti dengan router
.get(kambingcontroller.index)// kambingcontroller digunakan untuk memanggil properti index pada file kambing.js
router.route('/kambing').post(upload.single('image'), (req, res, next) => {
    const kambing = new Kambing({
        id: req.body.id,
        nama: req.body.nama,
        harga: req.body.harga,
        keterangan:req.body.keterangan,
        password: req.body.password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    kambing.save(function (error) {
        if (error) return handleError(error);
        res.redirect('/kambing')
    });


});
// router.route('/kambing/update').post(kambingController.baharui)
router.route('/kambing/update').post(upload.single('image'), (req, res, next) => {
    const _id = req.body._id
    const id = req.body.id
    const nama = req.body.nama
    const harga = req.body.harga
    const keterangan = req.body.keterangan
    const password = req.body.password
    const filter = { _id: _id };
    const update = {
        id: id,
        nama: nama,
        harga: harga,
        keterangan : keterangan,
        password: password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    };
    Kambing.updateOne(filter, update, function (err) {
        res.redirect('/kambing')
    });
});
router.get('/kambing/create', kambingcontroller.create)
router.get('/kambing/:id', kambingcontroller.show)

//tambahan
router.route('/kambing/update').post(kambingcontroller.baharui)
router.get('/kambing/hapus/:id', kambingcontroller.hapus)
router.route('/kambing/update/:_id/:id/:nama/:harga/:keterangan/:password').get(kambingcontroller.renderUpdate)



//UPDATE DATA
router.put('/kambing/:idkam', kambingcontroller.update)
//HAPUS DATA
router.delete('/kambing/:idkam', kambingcontroller.delete)


module.exports = router //modul ini diisi route khusus untuk (URL:/kambing),
                        //dan sudah bisa di exports