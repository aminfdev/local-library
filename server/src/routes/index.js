import express from "express";
import { authRouter } from "./auth/index.js";
import { booksRouter } from "./books/index.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);

export { router as apiRouter };