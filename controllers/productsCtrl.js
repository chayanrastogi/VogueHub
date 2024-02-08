import Product from "../models/Product.js";
import asynchandler from "express-async-handler";

//@desc   Create product
//@route  POST /api/v1/products
//@access Private/Admin
export const createProduct = asynchandler(async (req, res) => {
    const { name, description, category, sizes, colors, price, totalQty, brand, user } = req.body;

    //product already exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
        throw new Error('Product already exists');
    }

    //create product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
    });

    //push the product into category

    //send response
    res.json({
        status: 'success',
        message: 'Product created successfully',
        product,
    });
});


//@desc   Get all products
//@route  GET /api/v1/products
//@access Public
export const getProducts = asynchandler(async (req, res) => {
    //query
    let productQuery = Product.find();
 
    //name 
    if(req.query.name){
        productQuery = await productQuery.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    }

    //brand
    if(req.query.brand){
        productQuery = await productQuery.find({
            brand: {$regex: req.query.brand, $options: 'i'}
        })
    }

    //category
    if(req.query.category){
        productQuery = await productQuery.find({
            category: {$regex: req.query.category, $options: 'i'}
        })
    }

    //size
    if(req.query.sizes){
        productQuery = await productQuery.find({
            sizes: {$regex: req.query.sizes, $options: 'i'}
        })
    }

    //colors
    if(req.query.colors){
        productQuery = await productQuery.find({
            colors: {$regex: req.query.colors, $options: 'i'}
        })
    }

    const products = productQuery;
    res.json({
        status: 'success',
        message: 'Products fetched successfully',
        products,
    });
});