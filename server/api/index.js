import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import classRoutes from "./routes/classes.js";
import postRoutes from "./routes/posts.js";
import enrollRoutes from "./routes/enrollment.js";

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors(
    {origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/enroll", enrollRoutes);
app.listen(8800, () => {
    console.log("API working!");
});