require("dotenv").config({path:"./envs/.envs.setting"});
const mongoose = require("mongoose");

module.exports = () =>{
    mongoose
        .connect(process.env.DB, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        .then(()=>{
            console.log("Connect!!");
        })
        .catch((error)=>{
            console.log(error);
            console.log("DB Connect ERROR!!");
        });
}