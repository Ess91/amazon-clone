const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51HVfe1JQibx0f1gvb8Sv1J0gtxRbzLos91J3ugiHDLCDdmPGFC3TdpCEIJw9PBmkIWWQQhC86UI3ri94e82aZwSq00GjB8XBBK"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));



app.post("/payments/create", async (request, response) => {
  ///Since payment.js const response has total as a query parameter in the URL
  const total = request.query.total; //This is amount in subunits

  console.log("Payment Request Recieved >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "gbp",
  });

  // OK - Created Response Code
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


//Listen Command
exports.api = functions.https.onRequest(app);

//Example Endpoint
// http://localhost:5001/clone-56b93/us-central1/api
