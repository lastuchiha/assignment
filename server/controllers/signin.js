import { compare } from "bcrypt";
import User from "../modals/user.js";
import jwt from "jsonwebtoken";

export default async function signin(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error("Username or Password Missing");
        }

        const user = await User.findOne({ username });
        if (!await compare(password, user.password)) {
            throw new Error("Incorrect Password");
        }
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