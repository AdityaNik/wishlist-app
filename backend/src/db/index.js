import { Schema, model } from 'mongoose';


const User = new Schema({
    username: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String,
})

const WishList = new Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    ownerEmail: Schema.Types.String,
    members: [Schema.Types.String],
})

const Product = new Schema({
    wishlistId: Schema.Types.ObjectId,
    name: Schema.Types.String,
    price: Schema.Types.Number,
    imageUrl: Schema.Types.String,
    createdBy: Schema.Types.String,
});

export const UserModel = model('User', User);
export const WishListModel = model('WishList', WishList);
export const ProductModel = model('Product', Product);