import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [subscriptions, setSubscription] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/subscription", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSubscription(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSubscription();
  }, [token]);
  return (
    <div className="container">
      {console.log(user)}
      <h1 style={{ textTransform: "uppercase" }}>{user.username}!!!!</h1>
      <h2> Welcome To DripBox Where Your Fashion Needs Are Met With Ease For A Small Fee </h2>
      <h3> No contracts.  100% Satisfaction Guarantee!</h3>

      {subscriptions &&
        subscriptions.map((subscription) => (
          <div key={subscription.id} className="subscription-container">
            <div className="subscription-details">
              <h4>{subscription.tier}</h4>
              <p>Frequency: {subscription.frequency}</p>
              <p>Amount: {subscription.amount}</p>
              <p>Quantity: {subscription.category}</p>
            </div>
            

            <button onClick={() => navigate("/payment", { amount: subscription.amount })} >Buy Now</button>

          </div>
  ))} <button onClick={() => navigate("/survey")}> Find Whats Suite You</button>
     </div>
  );
};

export default HomePage;
