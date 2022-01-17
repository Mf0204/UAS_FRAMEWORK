const Kambing = require("../models/kambing");
//membuat data array
// let kambing = [
//     {id: 1, nama: 'jamal', harga : '2.000.000', keterangan: 'tersedia'},
//     {id: 2, nama: 'jamil', harga : '2.500.000', keterangan: 'tersedia'}
// ]

module.exports =//lakukan module export sebuah objek
{
    index : function (req, res){ //membuat properti function dengan nama index
        let keyword = {}
        if (req.query.keyword){
            keyword = {nama:{$regex: req.query.keyword}}
        }
        Kambing.find (keyword, "nama _id img harga keterangan", function(error, kambing){
            if (error) console.log(error)
        
            res.render ('pages/kambing/index', {kambing})
        })
        // Kambing.find (function(error, kambing){
        //     if(error) console.log (error)
        //     console.log (kambing)
        //     res.render('pages/kambing/index', {kambing})
        // })
        // if (kambing.length >0){ //tambahkan sintak kondisi jika data kbg > 0 maka tampilkan status true dan method yang digunakan
        //     res.json({
        //         status : true,
        //         data : kambing,
        //         method : req.method,
        //         URL : req.url,
        //         tanggal: new Date
        //     })
        // }
        // else { //kondisi yang lain, jika data kbg kosong maka tampilkan status false dan pesan
        //     res.json ({
        //         status : false,
        //         message : 'Data kambing masih kosong'
        //     })
        // }
        
    },
    show: function (req, res){
        const id = req.params.id
        // const data = kambing.filter(kambing =>{
        //     return kambing.id == id
        Kambing.findById (id, function (error, data){
            if (error) console.log (error)
         
            res.render('pages/kambing/show', {kambing: data})
        })
        // res.send(data)
    },
    create: function (req, res){
        res.render('pages/kambing/create')
    },
    tambah: function(req, res){
        const kambing = new Kambing({
            id: req.body.id,
            nama : req.body.nama,
            harga : req.body.harga,
            keterangan : req.body.keterangan,
            password : req.body.password,
        })
        kambing.save (function(error){
            if (error) return handleError (error);
            res.redirect('/kambing')
        });

    },
//     tambah: function (req, res){
//         kambing.push(req.body) //kirimkan semua req data body ke dalam daftar kambing
//         res.send({ //merubah res json menjadi bentuk objek
//             status: true,
//             data: kambing,
//             message: 'Data kambing berhasil ditambahkan',
//             method : req.method,
//             url : req.url,
//             tanggal: new Date
//         })
    
//    },


//TAMBAHAN
  
update: function (req, res) { //Memperbaharui data
    const id = req.params.idkam;
    let isFound = false
    console.log(id)
    kambing.filter(proj => { //Filter adalah metode update dari javascript (agar data kambing di filter satu/satu)
        if (proj.idkam == id) { //Untuk pengecekan kondisi
            proj.nama = req.body.nama
            proj.harga = req.body.harga
            proj.keterangan = req.body.keterangan
            proj.password = req.body.password
            res.send({
                status: true,
                data: kambing,
                message: "Project berhasil diperbaharui",
                method: req.method,
                url: req.url,
                tanggal: new Date()
            })
            isFound = true
            return proj //return data kambing yang baru
        }
    })
    if (isFound == false) {
        res.send({
            status: false,
            message: "project tidak ditemukan"
        })
    }
    res.json(kambing) //tampilkan data kambing yang baru
},
baharui: function (req, res) {
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
        harga : harga,
        keterangan: keterangan,
        password: password
    };
    Kambing.updateOne(filter, update, function (err) {
        console.log(nama,harga, keterangan, password)
        res.redirect('/kambing')
    });


},
renderUpdate: function (req, res) {
    const id = req.params._id
    Kambing.findById(id, function (error, data) {
        if (error) console.log(error)
        console.log(data)
        res.render('pages/kambing/update', { kambing: data })
    })
},

hapus: function (req, res) {
    const id = req.params.id
    Kambing.deleteOne({ _id: id }, function (err) {
        if (err) return console.log(err);
        res.redirect('/kambing')
    });
},
delete: function (req, res) { //Menghapus data
    const id = req.params.idkam;
    let isFound = false
    kambing.filter(proj => {
        if (proj.idkam == id) {
            const index = kambing.indexOf(proj)
            kambing.splice(index, 1)
            res.send({
                status: true,
                data: kambing,
                message: "Project berhasil dihapus",
                method: req.method,
                url: req.url,
                tanggal: new Date()
            })
            isFound = true
        }
    })
    if (isFound == false) {
        res.json({
            status: false,
            message: "Project tidak ditemukan"
        })
    }
    res.json(kambing)
}
}