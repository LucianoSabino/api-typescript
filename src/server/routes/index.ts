import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadeController } from "./../controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("Olá mundo!");
});

router.post("/cidade", CidadeController.create);

export { router };
