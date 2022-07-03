const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

const port = 5000;

app.get("/", (req, res) => {
    res.send("Cors proxy");
});

app.post("/cors", async(req, res) => {
  
    const method = req.body['method'];

    const endpoint = req.body['url'];

    const headers = req.body['headers'];

    const data = req.body['data'];

    if (method == 'POST') {

        await axios.post(endpoint, data,{
            headers: headers
        }).catch(function (error) {
            throw new Error(res.status(400).send("Error"))
        }).then(response =>res.send(response.data));

    } else {
    await axios.get(endpoint, {
        headers: headers,
    }).catch(function (error) {
        throw new Error(res.status(400).send("Error"))
    }).then(response => res.send(response.data));
    }
    
});

app.listen(port, () => {
    console.log("Server başlatıldı");
});