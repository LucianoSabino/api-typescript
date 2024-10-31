import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
    res.send("Olá mundo!");
});

router.post("/test", (req, res) => {
    console.log(req.body);
    res.status(StatusCodes.ACCEPTED).json("teste!");
});

export { router };
