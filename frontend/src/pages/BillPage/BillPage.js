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
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const response = await axios.get(
          `http://127.0.0.1:5000/api/payment?user_id=${user.id}&start_date=${startOfMonth}&end_date=${endOfMonth}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const payments = response.data;
        const totalAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
        setAmountDue(totalAmount);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBillingInfo();
  }, [user.id, token]);

  return (
    <div className="container">
      {console.log(user)}
      <h1> {user.username}!!!!</h1>
      <h1>Bill for {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h1>
      {amountDue !== null ? (
        <div>
          <p>Amount due: ${amountDue}</p>
          <p>Budget accordingly!</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
                  <button onClick={() => navigate("/payment", { amount: amountDue.amount })} >Buy Now</button>

    </div>
  );
};

export default BillPage;
