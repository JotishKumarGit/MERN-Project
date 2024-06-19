import React, { useState } from 'react';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = React.useState(false);


    let AddProduct = async () => {
        console.log(!name);
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }


        console.log(name, price, category, company);
        // Local Storage ke under data json format me milega
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);

    }
    return (
        // This is error validation ({error && !name && <Span clasName="invalid-input">Enter valid thing<span>})
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type='text' placeholder='Enter product price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price &&<span className='invalid-input'>Enter valid product</span>}
            <input type='text' placeholder='Enter product category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input type='text' placeholder='Enter product company' className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company &&<span className='invalid-input'>Enter invalid company</span>}
            <button className='appButton' onClick={AddProduct}>Add Product</button>
        </div>
    )
};

export default AddProduct;