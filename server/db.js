import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.set('strictQuery', false);
export default async () => {
    return mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
    });
}