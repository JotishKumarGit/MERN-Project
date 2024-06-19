import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Ek bar call hoga jab function reload hoga tab
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        Headers:{
            authorization: JSON.parse(localStorage.getItem('token'))
        }
        result = await result.json();
        setProducts(result);
    }

    // THis is for deleted the record
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            alert("Record is deleted");
            getProducts();
        }
    };

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            // When i clean the search bar then the data are come
            getProducts()
        }
    }


    return (
        // This is simple something like serial in the form of table
        <div className='product-list'>
            <h3>Product List</h3>
            <input type='text' placeholder='Search product' className='search-product-box' onChange={searchHandle} />
            <ul>
                <li>Sr No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                // From this function we store all the data inside the (products)
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                )
                    // if in the data base dont have any result when i am serch than this condition work
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;