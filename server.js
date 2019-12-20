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
        if(!(resPromise.data.includes("<Contact>") && resPromise.data.includes("</Contact>")))
            res.send({
                response: "getClienteFromPhone",
                phone,
                
   "IDCli":[
     ""
   ],
   "petcogrooming":[
      ""
   ],
   "petcoach":[
     ""
   ],
   "petconps":[
  ""
   ],
   "petcopedido":[
    ""
   ],
   "petcocupones":[
     ""
   ],
   "apPat":[
    ""
   ],
   "apMat":[
      ""
   ],
   "nombre":[
     ""
   ],
   "gen":[
      ""
   ],
   "address1":[
      ""
   ],
   "address2":[
      ""
   ],
   "estado":[
      ""
   ],
   "municipio":[
      ""
   ],
   "telefono":[
      ""
   ],
   "correo":[
      ""
   ],
   "idMasc1":[
      ""
   ],
   "noMasc1":[
     ""
   ],
   "razMasc1":[
     ""
   ],
   "pesMas1":[
     ""
   ],
   "nacMasc1":[
      ""
   ],
   "sexMasc1":[
     ""
   ],
   "colMasc1":[
      ""
   ],
   "idMasc2":[
      ""
   ],
   "noMasc2":[
      ""
   ],
   "razMasc2":[
      ""
   ],
   "pesMas2":[
      ""
   ],
   "nacMasc2":[
      ""
   ],
   "sexMasc2":[
      ""
   ],
   "colMasc2":[
      ""
   ],
   "idMasc3":[
      ""
   ],
   "noMasc3":[
      ""
   ],
   "razMasc3":[
      ""
   ],
   "pesMas3":[
      ""
   ],
   "nacMasc3":[
      ""
   ],
   "sexMasc3":[
      ""
   ],
   "colMasc3":[
      ""
   ],
   "idMasc4":[
      ""
   ],
   "noMasc4":[
      ""
   ],
   "razMasc4":[
      ""
   ],
   "pesMas4":[
      ""
   ],
   "nacMasc4":[
      ""
   ],
   "sexMasc4":[
      ""
   ],
   "colMasc4":[
      ""
   ],
   "idMasc5":[
      ""
   ],
   "noMasc5":[
      ""
   ],
   "razMasc5":[
      ""
   ],
   "pesMas5":[
      ""
   ],
   "nacMasc5":[
      ""
   ],
   "sexMasc5":[
      ""
   ],
   "colMasc5":[
      ""
   ]
             });
        parseString(resPromise.data, (err, jsonParsed)=>{
            let parsed = jsonParsed.ArrayOfContact.Contact;
            let jsonResponse = { };
            if(!parsed || parsed === {} || parsed === [] || err)
                res.send({
                    response: "getClienteFromPhone",
                    phone
                });
            for(var obj of parsed){
                for(var property in obj){
                    if(property.includes('petco'))
                        for(var i = 0; i < obj[property].length; i++)
                            obj[property][i] = "https://".concat(obj[property][i]);

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
