import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

// Validação qualquer coisa e na documentação do yup
interface IBodyProps {
    nome: string;
}

interface IParamProps {
    id?: number;
}

export const updateByValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3),
        })
    ),

    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const updateById = async (
    req: Request<IParamProps, {}, IBodyProps>,
    res: Response
) => {
    console.log(req.body);
    console.log(req.params);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
