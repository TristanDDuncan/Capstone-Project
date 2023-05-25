import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminHome = (props) => {

return (
<div>
    <table>
        <thead>
            <tr>
                <th>Username ID</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Subscription</th>    
            </tr>
        </thead>
        <tbody>
            {props.parentData.map((data, index) => {
                return (
                    <tr> 
                        <td>{index + 1}</td>
                        <td>{data.address}</td>
                        <td>{data.city}</td>
                        <td>{data.state}</td>
                        <td>{data.subscription}</td>
                    </tr>
                
                );
            }
            )}
        </tbody>
    </table>
</div>
);
};



export default AdminHome;