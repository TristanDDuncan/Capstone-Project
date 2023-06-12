import React, {useState} from 'react';

const AdminUserEntry = (props) => {
    const[first_Name, setFirstName] = useState("")
    const[last_Name, setLastname] = useState("")
    const[address, setAddress] = useState("")
    const[city, setCity] = useState("")
    const[state, setState] = useState("")


const handleSubmit = async(e) =>{
    e.preventDefault();
    let newUser = {
        first_Name:first_Name,
        last_Name:last_Name,
        address:address,
        city:city,
        state:state
    }
    console.log(newUser);
    props.AdminUserEntry(newUser)
}

    return(
        <form onSubmit={handleSubmit}>
            <h1>Register User</h1>
            <label>First Name</label>
            <input name="first_name" onChange={(e)=>setFirstName(e.target.value)}/>
            <label>Last Name</label>
            <input name="last_name" onChange={(e)=>setLastname(e.target.value)}/>
            <label>Address</label>
            <input name="address" onChange={(e)=>setAddress(e.target.value)}/>
            <label>City</label>
            <input name="city" onChange={(e)=>setCity(e.target.value)}/>
            <label>State</label>
            <input name="state" onChange={(e)=>setState(e.target.value)}/>
            <button type="submit">Add New User</button>
        </form>
    );
};
export default AdminUserEntry

