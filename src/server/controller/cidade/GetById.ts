import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { CidadeProvider } from "../../database/providers/cidade";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

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
    req: Request<IParamProps>,
    res: Response
): Promise<void> => {
    if (!req.params.id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parametro 'id' precisa ser informado!",
            },
        });
    }

    const result = await CidadeProvider.getById(Number(req.params.id));

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return void res.status(StatusCodes.OK).json(result);
};
