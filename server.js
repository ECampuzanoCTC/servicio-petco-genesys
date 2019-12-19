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

    axios.get(`http://201.149.55.114/WSpetco.asmx/getContact?numtel=${phone}`)
    .then(resPromise=>{
        parseString(resPromise.data, (err, jsonParsed)=>{
            let parsed = jsonParsed.ArrayOfContact.Contact;
            let jsonResponse = { };

            for(var obj of parsed){
                for(var property in obj){
                    if(property.includes('petco')){
                        for(var i = 0; i < obj[property].length; i++){
                            var p = "https://".concat(obj[property][i]);
                            obj[property][i] = p; 
                            console.log(p);
                        }
                            
                    }
                    jsonResponse[property] = obj[property];
                }
            }
            
            jsonResponse.response = "getClienteFromPhone";
            jsonResponse.phone = phone;

            res.send(jsonResponse);
        })
    })
    .catch(err=> console.log(err) );
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});