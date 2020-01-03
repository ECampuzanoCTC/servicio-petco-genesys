import express from 'express';
import bp from 'body-parser';
import axios from 'axios';
import xml2js  from 'xml2js';



let { parseString } = xml2js;
let app = express();

let port = process.env.PORT || 3000;

app.get('/ping', (req, res)=>{
    res.send({
        response: "pong"
    });
})

app.get('/getContacto',  (req, res)=>{

    let { by, correo, telefono } = req.query;
    let params = {};
    let responseObj = {};

    if(correo){
        params.byParam = "correo";
        params.paramValue = correo;
    }else if(telefono){
        params.byParam = "telefono";
        params.paramValue = telefono;
    }else{
        return res.send({
            err: "El parámetro es requerido"
        })
    }

    axios.get(`http://201.149.55.114/ctconsulting.petco-servicio/getContacto?by=${by}&${params.byParam}=${params.paramValue}`)
    .then(({data})=>{
        if(!data.idcli)
            return res.send({ ...data, comentarios:[] })

        responseObj = {...data, comentarios:[]};
        return axios.get(`http://201.149.55.114/ctconsulting.petco-servicio/getComentario?IDCLi=${data.idcli}`)
    })
    .then(({data})=>{
        if(data.length < 1)
            return res.send(responseObj);

        responseObj.comentarios = data;
        res.send(responseObj);
    })
    .catch(err=>res.send(err))
});

app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});
