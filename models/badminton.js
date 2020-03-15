const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new Schema({
    me:{
        type:String
    },
    opponent:{
        type:String
    },
    result:{
        type:Boolean
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("badminton",postSchema);