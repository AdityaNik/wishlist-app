import express from 'express';
import { ProductModel } from '../db/index.js';

const router = express.Router();


router.get('/', async (req, res) => {
    // return all products
    const products = await ProductModel.find({});
    res.json(products);
});

router.post('/add', async (req, res) => {
    const { wishlistId, name, price, imageUrl, createdBy } = req.body;
    if (!wishlistId || !name || !price || !imageUrl || !createdBy) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = await ProductModel.create({
        wishlistId,
        name,
        price,
        imageUrl,
        createdBy,
    });

    newProduct.save().then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

export default router;