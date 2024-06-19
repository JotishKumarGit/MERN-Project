import React from "react";

// hum jo component pass karenge usko as Outlet props ko handle karega
import {Navigate, Outlet} from 'react-router-dom';


const PrivateComponent = () =>{
    // localStorage me user signup hoga iske liye
    const auth = localStorage.getItem('user');
return auth ? <Outlet />:<Navigate to="/signup" />
}





export default PrivateComponent;