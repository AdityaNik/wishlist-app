import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AuthRouter from './auth/auth.js';
import ProductRouter from './routes/product.js';
import WishlistRouter from './routes/whishlist.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://adityanikam481:YQb7ocD461hqbMUt@cluster0.6clgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {dbName: 'wishlist'});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);
app.use('/wishlist', WishlistRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});