import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

// Definição da interface com page e limit como number | undefined
interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const GetAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().min(1),
            limit: yup.number().min(1),
            filter: yup.string(),
        })
    ),
}));

export const getAll = async (
    req: Request<{}, {}, IQueryProps>,
    res: Response
) => {
    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", 1);

    res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: "Cruz",
        },
    ]);
};
