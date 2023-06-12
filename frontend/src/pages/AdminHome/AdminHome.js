import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTracker from "./AdminTracker";
import AdminUserEntry from "./AdminUserEntry";

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the users data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        // Handle the error
      }
    };

    fetchUsers();
  }, []);

  const handleAdminUserEntry = async (newUser) => {
    try {
      // Make an API request to add the new user
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', newUser);
      // Update the users state with the new user
      setUsers([...users, response.data]);
      // Reset the form inputs
      // ...
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Username ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <AdminUserEntry AdminUserEntry={handleAdminUserEntry} />
      <AdminTracker />
    </div>
  );
};

export default AdminHome;
