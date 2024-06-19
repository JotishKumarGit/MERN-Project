import React, { useEffect, useState } from "react";
//This is Hooks (Hooks mostly used as a function) 
// useNavigate is used for Redirect the page
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    // From this function we Redirect the UpdateProduct in the Home page
    const navigate = useNavigate();

    // This is for pass the id of any product
    useEffect(() => {
  
        getProductDetails();
    });

    // Update product me data ko fill karne ke liye
    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    const updateProduct = async () => {
        console.log(name, price, category, company);
        // From this function we integrate the Update product 
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json()
        console.log(result);
        navigate('/')
    }


    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type="text" placeholder="Enter product price" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <input type="text" placeholder="Enter product category" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} />
            <input type="text" placeholder="Enter product company" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} />
            <button className="appButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;