
const cors = require('cors');
const express = require('express');
const Config = require('./db/config')
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
// This key is securate (only i am generate the token)
const jwtkey = 'e-com';
const app = express();
// Middleware (express ka josn) uses (body ko send karne ke liye)
// postman or react js send data ko send karte hai use (Control karne ka kam aata hai)
app.use(express.json());
// Hare i use cors as a middleware
app.use(cors());
// Now we make Route (jis link ko consume karne ke liye API ko hit karenge That is called Route) 
app.post("/register", async (req, res) => {
    // Data ko db me store karenge
    let user = new User(req.body);
    let result = await user.save();
    // Is function se password nahi aayega jab api se data ko send karenge
    result = result.toObject();
    delete result.password
    // This function is for generate the token for auth
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, Please try after sometime" });
        }
        res.send({ result, auth: token })
    })
});

// Login Route (using post)
app.post("/login", async (req, res) => {
    // jab api se data ko send karenge tab console pe dikhega
    console.log(req.body);
    if (req.body.password && req.body.email) {
        // .select("-Password") se password ko remove kar dega
        let user = await User.findOne(req.body).select("-password");
        // API ko test (user sahi data fill kiya ya nahi)
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try after sometime" });
                }
                res.send({ user, auth: token })
            })
            //  res.send(user);
        } else {
            res.send({ result: "No user found" });
        }
    } else {
        res.send({ result: "No User Found" });
    }
})
// create Route for Product (Make API for The Product)
app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

// data ko get karne ke liye get methiod
app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No products found" });
    }
}); // API is ready for Test

// This is for (DELETE Product)
app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

// Single page API ke liye
app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record Found" });
    }
})

// This is for Update Product
app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { id: req.params._id },
        {
            $set: req.body
        }
    )
    res.send(result);
});

// Making API for the Searching
app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

// Make Middleware
// function verifyToken(req, res, next) {
//     const token = req.header['Authorization'];
//     if (token) {
//         token = token.split(' ')[1];
//         console.log("middleware called", token);
//         Jwt.verify(token, jwtkey, (err, valid) => {
//             if (err) {
//                 res.send({ result: "Please provide valid token with header" })
//             } else {
//                 next();
//             }
//         })
//     } else {
//         res.send({ result: "Please add token with header" })
//     }
// }

// App is listen this port
app.listen(5000);