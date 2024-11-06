import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

// Validação qualquer coisa e na documentação do yup
interface ICidade {
    nome: string;
}
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(
        yup.object().shape({
            nome: yup.string().required().min(3),
        })
    ),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    res.status(StatusCodes.CREATED).send("Não implementado");
};
