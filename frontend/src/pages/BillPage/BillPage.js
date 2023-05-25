import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BillPage = () => {
  const [user, token] = useAuth();
  const [amountDue, setAmountDue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/subscription?user_id=${user.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const subscription = response.data.find((sub) => sub.id === user.subscription_id);
        const totalAmount = subscription ? subscription.amount : 0;
        setAmountDue(totalAmount);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBillingInfo();
  }, [user.id, user.subscription_id, token]);

  return (
    <div className="container">
      <h1 style={{ textTransform: "uppercase" }}>{user.username}!!!!</h1>
      <h1>Bill for {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h1>
      {amountDue !== null ? (
        <div>
          <p>Amount due: ${amountDue}</p>
          <p>Budget accordingly!</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => navigate("/payment", { amount: amountDue })}>Buy Now</button>
    </div>
  );
};

export default BillPage;
