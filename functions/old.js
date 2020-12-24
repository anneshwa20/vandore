const functions = require('firebase-functions');
const express= require("express");
const cors= require("cors");
const { response } = require('express');
const stripe= require("stripe")('sk_test_51HhCb7Ks7edpRlOlL0gP2fVywq5tTYH0oNmOQajPsvcxGsBthrJ410lIpShYMaJmEnRSWU8tynkGE8ZrgKuA6pbP005Eu3Qs4I');

// API


// - APP CONFIG
const app= express();

//MIDDLEWARES
app.use(cors({ origin: true}));
app.use(express.json());

//APIROUTES
/* app.get('/',(req,res) => res.status(200).send('hello world'));

app.post('/payments/create', async(req,res) => {
    const total=  req.query.total;

    console.log('Payment Request Recieved: ', total);
    const paymentIntent= await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
        description:'test'
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
}) */

// - LISTEN COMMAND
exports.api= functions.https.onRequest(app);


//http://localhost:5001/restro-e4874/us-central1/api