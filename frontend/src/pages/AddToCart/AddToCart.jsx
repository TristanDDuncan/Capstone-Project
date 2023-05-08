import React from "react";
import { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./AddToCart.css";


const PaymentPage = ({amount}) => {

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      
        <PayPalScriptProvider options={{ "client-id": "AZ6RBGQT9hg8ls54GsLQZp2v909PwjFo8VzO1BEdsfE8aENMpXOhXFUGWLL4N28SA_OD8ESMZmf4nbYl" 
        }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "100.00",
                    },
                    
                  },
                  
                ],
              });
            }}
            onApprove={( data, actions) => {
              return actions.order.capture().then((details) => {
        
              });
            }}
          />
        </PayPalScriptProvider>
           
    </div>
  );
};

export default PaymentPage;
