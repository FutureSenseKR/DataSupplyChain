const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateListSchema = new Schema({
    
    hash:{
        type:String,
        required:true
    },

    lastEvent:{
        type:String,
        required:true
    }

}, {timestamps: true });

const stateListMetaData = mongoose.model("stateListMetaData", stateListSchema)
module.exports = stateListMetaData;

