const FileMetadata = require('../model/file')

exports.read = async (req, res) =>{
    try{
        const name = req.params.name;
        console.log(name)
        const data = await FileMetadata.findOne({fileName:name})
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        res.stats(500).json(data)
        console.log(error)
    }
}