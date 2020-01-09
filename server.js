import express from 'express';
import bp from 'body-parser';
import axios from 'axios';
import xml2js  from 'xml2js';



let { parseString } = xml2js;
let app = express();

app.use(bp.json());

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
        params.paramValue = telefono.replace("tel:", "");
    }else{
        return res.status(400).send({
            err: "El parámetro es requerido"
        })
    }

    axios.get(`http://201.149.55.114/ctconsulting.petco-servicio/getContacto?by=${by}&${params.byParam}=${params.paramValue}`)
    .then(({data})=>{
            res.send(data);
    })
    .catch(err=>res.status(500).send(err))
});

app.post("/addComentario", (req, res)=>{
    let { comentario, idcli } = req.body;
    
    if(!comentario || !idcli)
        return res.status(500).send({err: "Se necesitan los parametros comentario e idcli"});
    axios.post(`http://201.149.55.114/ctconsulting.petco-servicio/addComentario`, {  comentario, idcli })
    .then(({data})=>{
        res.status(200).send({...data})
    })
    .catch(err=>res.status(404).send(err))
});
app.post("/addContacto", (req, res)=>{
    let { nombre, correo, telefono, idcli } = req.body;
    if(!( nombre && correo && telefono && idcli ))
        return res.status(400).send({err: "Se necesitan todos los parámetros"});
    axios.post(`http://201.149.55.114/ctconsulting.petco-servicio/addContacto`, req.body)
    .then(({ data })=>{
        res.send(data);
    })
    .catch(err=>res.status(500).send(err))
})
app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});
