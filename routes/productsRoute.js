import express from 'express';
import { createProduct, getProducts } from '../controllers/productsCtrl.js';
import { isLoggendIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();

productRouter.post('/', isLoggendIn, createProduct);
productRouter.get('/', getProducts);


export default productRouter;