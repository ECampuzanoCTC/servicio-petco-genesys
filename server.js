import express from 'express';
import bp from 'body-parser';
import axios from 'axios';
import xml2js  from 'xml2js';

let parseString = xml2js.parseString
let app = express();

let port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send({
        response: "Response /GET"
    });
})
app.get('/getClienteFromPhone/:phone', (req, res)=>{
    let { phone } = req.params;
    let json = {
        "title": "Response",
        "description": "Response objeto de clientes",
        "type": "array",
        "properties": {},
        "items": [
            {
                "response": "getClienteFromPhone"
            },
            {
                phone
            }
        ]
    }
    

    axios.get(`http://201.149.55.114/WSpetco.asmx/getContact?numtel=${phone}`)
    .then(resPromise=>{
        parseString(resPromise.data, (err, jsonParsed)=>{
            let parsed = jsonParsed.ArrayOfContact.Contact;
            res.send({
                ...json,
                parsed
            })
        })
    });

    /* if(phone)
        res.send({
            ...json
            
        })
    else
        res.send({
            ...json, items:[]
        }
        ); */
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});