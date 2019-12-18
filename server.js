import express from 'express';
import bp from 'body-parser';
let app = express();

let port = process.env.PORT || 8080;

app.get('/', (req, res)=>{
    res.send({
        response: "Response /GET"
    });
})
app.get('/getClienteFromPhone/:phone', (req, res)=>{
    let { phone } = req.params;
    if(phone)
        res.send({
            phone,
            "resonse": "getClienteFromPhone"
        })
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});