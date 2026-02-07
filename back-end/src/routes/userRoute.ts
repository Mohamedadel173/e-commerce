import express from "express";
import { login, register } from "../services/userService.js";

const router = express.Router();

router.post("/register", async(req, res) => {
    const {statusCode, data} = await register(req.body);
    // res.status(statusCode).json(data);
    res.status(statusCode).send(data);
});

router.post("/login", async(req, res) => {
    const {statusCode, data} = await login(req.body);
    res.status(statusCode).send(data);
});

export default router;