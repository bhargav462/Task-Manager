const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const novelSchema = new Schema({
    userId:{
        type:ObjectId
    },
    bookName : {
        type : String
    }
})

module.exports = mongoose.model("novel",novelSchema);