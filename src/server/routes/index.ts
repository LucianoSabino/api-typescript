import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadeController } from "./../controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("Olá mundo!");
});

router.get(
    "/cidade",
    CidadeController.GetAllValidation,
    CidadeController.getAll
);
router.post(
    "/cidade",
    CidadeController.createValidation,
    CidadeController.create
);

export { router };
