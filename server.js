import express from 'express';

let app = express();
let port = process.env.PORT || 3000;

app.get('/phoneNumber', (res, req)=>{
    req.send(
        {
            response: "Response Test"
        }
    );
});


app.listen(port, (err)=>{
    if(err) 
        console.log(err);
    console.log(`Corriendo en ${port}`);
});