import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

export default function auth(req, res, next) {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            res.locals.loggedInUser = null;
        } else {
            const loggedInUser = verify(accessToken, process.env.SECRET);
            res.locals.loggedInUser = loggedInUser;
        }
        next();
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}