import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import productRouter from '../routes/productsRoute.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';

//db connection
dbConnect();
const app = express();  

//pass incoming data
app.use(express.json());

//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRouter);

//errhandler middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;