const express=require("express");

const cors=require("cors");

const fs=require("fs-extra");

const path=require("path");


const app=express();

app.use(cors());

app.use(express.json());



const formsFile=

path.join(

__dirname,

"data",

"forms.json"

);





app.get(

"/forms",

async(req,res)=>{


const forms=

await fs.readJson(

formsFile

);


res.json(

forms

);


}

);





app.post(

"/forms",

async(req,res)=>{


const forms=

await fs.readJson(

formsFile

);



forms.push(

req.body

);



await fs.writeJson(

formsFile,

forms

);



res.json(

{

message:

"Saved"

}

);


}

);





app.listen(

5000,

()=>{


console.log(

"Backend running"

);


}

);