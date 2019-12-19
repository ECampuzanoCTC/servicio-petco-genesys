import express from 'express';
import bp from 'body-parser';
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
    if(phone)
        res.send({
            ...json
            
        })
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});