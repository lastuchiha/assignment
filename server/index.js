import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connect from "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

connect()
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running at http://localhost:${PORT}`);
    })
    )
    .catch((err) => {
        console.log(`Connection to DB failed due to\n${err.message}`);
    });


