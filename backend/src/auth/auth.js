import express from 'express';
import { UserModel } from '../db/index.js';

const router = express.Router();

router.get('/me', async (req, res) => {
    console.log("hello there: ", req.headers.email);
    const user = await UserModel.findOne({ email: req.headers.email });
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    res.json(user);
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).send('Email, username and password are required');
    }
    const user = await UserModel.findOne({ email });
    console.log(user)
    if (user) {
        return res.status(400).send('Email already exists');
    }
    const newUser = new UserModel({
        email,
        username,
        password,
    });
    newUser.save().then((user) => {
        res.json(user);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    console.log(email);
    console.log(password);

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    if (user.password !== password) {
        return res.status(401).send('Invalid email or password');
    }
    res.json({ 'msg': 'Login Successful', user});   
});

export default router;