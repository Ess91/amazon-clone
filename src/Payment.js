import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";



function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);


  // UseEffect is communicating with Stripe.
  useEffect(() => {
    //Generate a special stripe secret allowing customers to be charged 

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);

      console.log(response.data.clientSecret);
    };

   

    getClientSecret();
  }, [basket]); //When basket changes, the code at top will send a request to the client stripe for the customer to be charged

  
  console.log("THE SECRET IS >>>", clientSecret);
  //console.log("👱", user);

  const handleSubmit = async (event) => {
    //stripe part
 // To allow Clicking of the Buy Now button only once

    event.preventDefault();
    setProcessing(true);

// This is talking to Stripe to find out how much to charge the customer
    // stripe.confirmCardPayment(clientSecret, {payment_method: {card}})
    // This is a promise, so when the response comes back, we deconstruct 
    //it and retrieve paymentIntent(Payment Confirmation)
    

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // Push orders into the firebase Db!
        //paymentIntent = payment confirmation
        db.collection("users") // Reach into the users collection in Firebase Db
          .doc(user?.uid) // Look for this user in the db. This user is coming from state (user must be logged in)
          .collection("orders") // Reach into this specific user's orders
          .doc(paymentIntent.id) // Create document with paymentIntent Id with the following items
          .set({
            basket: basket, // Pass in basket items
            amount: paymentIntent.amount, // Comes back from Stripe
            created: paymentIntent.created, //Timestamp of when payment was created
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

         // Dispatch an event into react context api
        dispatch({
          type: "EMPTY_BASKET",
        });


        // Dont do history.push because we dont want the user to come back to the payment page
        // Instead swap the page by doing history.replace
        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    //Listen for changes in CardElement
    //Display any errors as the customer types their info

    setDisabled(event.empty);
     // If the field is empty, show nothing
    setError(event.error ? event.error.message : "");
     // If there is an error, show the error, otherwise show nothing
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>){" "}
        </h1>

        {/*Payment Section - Delivery Address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Avenue</p>
            <p>London, UK</p>
          </div>
        </div>

        {/*Payment Section - Review Items*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/*Payment Section - Payment Method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/*Stripe*/}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                   {/* Once Buy Now button is clicked, it'll switch to saying Processing and button will be disabled */}
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
              {/* If there are any errors with the card number as it's being typed in, it'll show on screen */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
