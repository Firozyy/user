import express from "express";
import dotenv from "dotenv";
import user from "./routes/userRoutes.js";

import cookieparser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config({ path: "./config/.env" });

const app = express();

app.use(cookieparser());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
app.use("/api/v1", user);


app.use(errorMiddleware);

export default app;