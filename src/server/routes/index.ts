import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
    CidadeController,
    PessoaController,
    UsuarioController,
} from "./../controller";

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

// Rotas de pessoa

router.post(
    "/pessoa",
    PessoaController.createValidation,
    PessoaController.create
);

router.put(
    "/pessoa/:id",
    PessoaController.updateByValidation,
    PessoaController.updateById
);

router.delete(
    "/pessoa/:id",
    PessoaController.deleteByIdValidation,
    PessoaController.deleteById
);

router.get(
    "/pessoa",
    PessoaController.GetAllValidation,
    PessoaController.getAll
);

router.get(
    "/pessoa/:id",
    PessoaController.getByIdValidation,
    PessoaController.getById
);

// Login

router.post(
    "/entrar",
    UsuarioController.singInValidation,
    UsuarioController.singIn
);
router.post(
    "/cadastra",
    UsuarioController.singUpValidation,
    UsuarioController.singUp
);
export { router };
