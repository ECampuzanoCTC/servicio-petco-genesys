import express from 'express';

let app = express();
let port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send({
        response: "Response /GET"
    });
})
app.get('/phoneNumber', (req, res)=>{
    res.send(
        {
            response: "Response /GET /phoneNumber"
        }
    );
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});