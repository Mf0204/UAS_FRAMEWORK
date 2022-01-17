const express =require ('express')
const kambingRouter = require('./router/kambing') //import file kambing
const app = express()

//Aktifkan tambahan setting default untuk req.body
app.use(express.json()) //for parsing application json
app.use(express.urlencoded({extended: true})) //for parsing application
app.use(express.static("public"));
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sp52');
const db = mongoose.connection
db.on ('error', function(){
    console.log ('koneksi gagal')
})
db.once('open', function(){
    console.log ('Koneksi Berhasil')
})
// var myLogger = function (request, respon, next) {
//     console.log("LOGGED"); //pesan ini akan ditampilkan di terminal saat aplikasinya dilewati
//     next();
// };

// app.use(myLogger); //cara express js untuk mengaktifkan atau memasang middleware
                    //sebelum dilanjutkan ke function selanjutnya
                    //pasang middleware sebelum jalur route aplikasinya dijalankan
// app.get("/", function (request, respon){ //function ini akan dijalankan ketika berhasil melewati middleware
//     respon.send("Selamat Belajar Express Js");
// });

const requestTime = function(request, respon, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
};

app.use(requestTime); //nama properti middleware bebas
app.set ('view engine','ejs')//baru
// app.get("/", function (request, respon){
//     const tanggal = "Selamat Belajar Express Js </br>" +
//     "<p><small>Requested at: " + date + "</small>"; //properti pesan dari middleware yang akan ditampilkan
//     respon.send(tanggal);
// });


app.use(kambingRouter) //tambahkan app.use nama const
app.listen(3000,function (request,respon){
    console.log('server berjalan lancar')
})


//Routing halaman utama
// app.get('/', function(request,respon){
//     respon.send('Hallo! Nama Saya Nur Indah Pratiwi')
// })

// membuat URL/about
app.get("/", function(request,respon){
    const jualan = {
        Id: 001,
        Nama: "indah",
    };
    respon.render('pages/index', {jualan: jualan})
});
app.get("/about", function(request,respon){
    respon.render('pages/about')
});
app.get("/awal", function(request,respon){
    respon.render('pages/awal')
});
app.use('/asset', express.static('public'))

// // method post untuk create atau mengirimkan ke server untuk disimpan di database
// app.post('/', function(request,respon){
//     respon.send('post!! Tambahkan Mahasiswi Semester 5')
// })

// // method put untuk mengirim data ke server dengan id yg spesifik untuk tujuan update database
// app.put('/user', function(request,respon){
//     respon.send('put!! Update Mahasiswi Semester 5')
// })

// // method delete menghapus data berdasarkan id tertentu
// app.delete('/user', function(request,respon){
//     respon.send('delete!! Saya Mahasiswi Semester 5')
// })

// // membuat route studi kasus kambing
// // app.route('/kambing')
// // .get(function (request, respon){
// //     respon.send('Tampilkan Data kambing') //menampilkan data
// // })

// // .post(function (request, respon){
// //     respon.send('Tambahkan Data kambing') //menambahkan data
// // })

// // .put(function (request, respon){
// //     respon.send('Update Data kambing') //mengupdate data
// // })

// // .delete(function (request, respon){
// //    respon.send('Menghapus Data kambing') //menghapus data 
// // })
