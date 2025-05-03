import express from 'express';
import { WishListModel } from '../db/index.js';


const router = express.Router();

router.get('/', async (req, res) => {
    // return all wishlists
    const wishlists = await WishListModel.find({});
    res.json(wishlists);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const wishlist = await WishListModel.findById(id);
    res.json(wishlist);
});

router.post('/add', async (req, res) => {
    const { name, description, ownerEmail} = req.body;
    if (!name || !description || !ownerEmail) {
        return res.status(400).send('name is required'); 
    }

    const newWishlist = await WishListModel.create({
        name,
        description,
        ownerEmail,
    })

    newWishlist.save().then((wishlist) => {
        res.json(wishlist);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

export default router;