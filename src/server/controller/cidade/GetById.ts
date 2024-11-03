import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

// Definição da interface com page e limit como number | undefined
interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().required().moreThan(0),
        })
    ),
}));

export const getById = async (
    req: Request<{}, {}, IParamProps>,
    res: Response
) => {
    console.log(req.params);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
