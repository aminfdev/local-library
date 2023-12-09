import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
