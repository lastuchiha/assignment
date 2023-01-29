import { hash } from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../modals/user.js";

dotenv.config();

export default async function register(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error("Missing Username or Password.");
        }

        else if (await User.findOne({ username })) {
            throw new Error("Username already exits, try another one.");
        }

        const hashedPw = await hash(password, 10);
        await User({ username, password: hashedPw }).save();
        const accessToken = jwt.sign({
            username
        }, process.env.SECRET);

        res.cookie("accessToken", accessToken, {
            maxAge: 24 * 60 * 1000,
            httpOnly: true
        }).status(200).json({
            username,
            accessToken
        });

    } catch (err) {
        res.status(400).json({ err: err.message });
    }

}