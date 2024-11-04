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

router.get(
    "/cidade/:id",
    CidadeController.getByIdValidation,
    CidadeController.getById
);

router.post(
    "/cidade",
    CidadeController.createValidation,
    CidadeController.create
);

router.put(
    "/cidade/:id",
    CidadeController.updateByValidation,
    CidadeController.updateById
);

router.delete(
    "/cidade/:id",
    CidadeController.deleteByIdValidation,
    CidadeController.deleteById
);

export { router };
