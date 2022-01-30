const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    stateList:[{hash:String, event:String, time:{type:Date, default: Date.now}}]

}, {timestamps: true });

const FILEMETADATA = mongoose.model("FileMetadata", FileSchema)
module.exports = FILEMETADATA;

