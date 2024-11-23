import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
    CidadeController,
    PessoaController,
    UsuarioController,
} from "./../controller";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.get("/", (req, res) => {
    res.send("Olá mundo!");
});

router.get(
    "/cidade",
    ensureAuthenticated,
    CidadeController.GetAllValidation,
    CidadeController.getAll
);

router.get(
    "/cidade/:id",
    ensureAuthenticated,
    CidadeController.getByIdValidation,
    CidadeController.getById
);

router.post(
    "/cidade",
    ensureAuthenticated,
    CidadeController.createValidation,
    CidadeController.create
);

router.put(
    "/cidade/:id",
    ensureAuthenticated,
    CidadeController.updateByValidation,
    CidadeController.updateById
);

router.delete(
    "/cidade/:id",
    ensureAuthenticated,
    CidadeController.deleteByIdValidation,
    CidadeController.deleteById
);

// Rotas de pessoa

router.post(
    "/pessoa",
    ensureAuthenticated,
    PessoaController.createValidation,
    PessoaController.create
);

router.put(
    "/pessoa/:id",
    ensureAuthenticated,
    PessoaController.updateByValidation,
    PessoaController.updateById
);

router.delete(
    "/pessoa/:id",
    ensureAuthenticated,
    PessoaController.deleteByIdValidation,
    PessoaController.deleteById
);

router.get(
    "/pessoa",
    ensureAuthenticated,
    PessoaController.GetAllValidation,
    PessoaController.getAll
);

router.get(
    "/pessoa/:id",
    ensureAuthenticated,
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
