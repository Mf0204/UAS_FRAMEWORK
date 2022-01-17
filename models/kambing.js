const mongoose = require ('mongoose')
const {Schema} = mongoose
//membuat tabel
const kambingSchema = new Schema({
    id:String,
    nama : String,
    harga : String,
    keterangan : String,
    password : String,
    //tambahan 17 january
    img: {
        data: Buffer, contentType: String
    },
},{timestamps: true});

//ekspor tabel kambing
const Kambing = mongoose.model('Kambing', kambingSchema)
module.exports = Kambing