const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new Schema({
    userId:{
        type:ObjectId
    },
    userPost:{
        type: Buffer
    },
    comment:{
        type: String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Post",postSchema);