var express = require('express');
var path = require('path');

var app = express();

app.use(express.urlencoded({ extended: false }));

const cors = require('cors')
app.use(cors())

const db = require('./config/db.js');
db();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(PORT, "Server Start!!");
});

/* -------------- Monitoring ----------------- */
const chokidar = require('chokidar')
const fs = require('fs')
const FileMetadata = require('./model/file')
const crypto = require('crypto')

function readFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', function(error, data){
            if(error) return reject(error);

            resolve(crypto.createHash('sha256').update(data).digest('hex'))
           
        })
    })
}

var watcher = chokidar.watch('C:\\Users\\nk129\\Desktop\\Test', {ignored:/[`~!@#$%^&*|\\]/gi, persistent:true});

watcher.on('all', async (event, path) => {

    var paths = path.split('\\')
    const fileName = paths[paths.length-1]
    console.log(fileName)
    if (event === "add") {
        console.log(event, path)
        var hash = await readFile(path)
        const data = await FileMetadata.findOne({ fileName:fileName });
        if (data === null) {
            await FileMetadata.create({
                fileName: fileName,
                content: hash,
                stateList: [{hash, event:"create"}]
            })
        } else{
            await FileMetadata.updateOne({ fileName:fileName }, { fileName: fileName, content: hash, $push:{stateList: {hash, event}} })
        }

    } else if (event === "unlink") {
        console.log(event, path)
        var data = await FileMetadata.findOne({fileName:fileName})
        await FileMetadata.findOneAndUpdate({ fileName: fileName }, {$push: {stateList:{hash:data.content, event}}});
        
    } else if (event === "change") {
        console.log(event, path)
        var hash = await readFile(path)
        await FileMetadata.findOneAndUpdate({fileName:fileName}, {$push: {stateList:{hash, event}}});
    }
})

module.exports = app;