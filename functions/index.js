//Express needed to get ot working on a cloud function

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
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

//Example Endpoint
//(http://localhost:5001/clone-56b93/us-central1/api).