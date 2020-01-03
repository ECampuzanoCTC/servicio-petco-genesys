import express from 'express';
import bp, { json } from 'body-parser';
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
        if(!data.idcli)
            return res.status(200).send({ ...data, comentarios:"" })

        responseObj = {...data};
        return axios.get(`http://201.149.55.114/ctconsulting.petco-servicio/getComentario?IDCLi=${data.idcli}`)
    })
    .then(({data})=>{
        if(data.length < 1)
            return res.status(200).send({...responseObj, comentarios:""});

        let comentarios = "";
        let dummyDate = new Date();
        for(var c of data){
            comentarios = comentarios.concat(`${dummyDate.getDate()}/${dummyDate.getMonth() + 1}/${dummyDate.getFullYear()} ${c.comentario}\n`);
        }

        responseObj = {
            ...responseObj,
            comentarios
        };
        res.status(200).send(responseObj);
    })
    .catch(err=>res.status(500).send(err))
});

app.post("/addComentario", (req, res)=>{
    let { comentario, idcli } = req.query;
    console.log(JSON.stringify(req.query, undefined, 2));
    if(!comentario || !idcli)
        return res.status(500).send({err: "Se necesitan los parametros comentario e idcli"});
    axios.post(`http://201.149.55.114/ctconsulting.petco-servicio/addComentario?comentario=${encodeURI(comentario)}&IDCLi=${idcli}`)
    .then(({data})=>{
        res.status(200).send({...data})
    })
    .catch(err=>res.status(404).send(err))
});

app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});
