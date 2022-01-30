var express = require('express');
var router = express.Router();

const FileMetadata = require("../model/file");

exports.read = async (req, res) =>{
    
    const name = req.params.name
    try{
        const data = await FileMetadata.findOne({fileName:name})
        res.status(200).json(data)
    }catch(error){
        res.status(500).json(error)
        console.log(error)
    }

}

exports.add = async (req, res) =>{
    const {
        fileName,
        content,
        event
    } = req.body

    const data = await FileMetadata.findOne({fileName:fileName})

    if(data===null){
        res.status(500).send("Create File First")
        return
    }else{
        await FileMetadata.findOneAndUpdate({fileName:fileName}, {content, $push: {stateList:{hash:content, event: event}}})
        res.status(200).send("DeDuplicate OK")
    }
}