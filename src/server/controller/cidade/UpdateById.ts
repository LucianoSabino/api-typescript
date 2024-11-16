import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Icidade } from "../../database/models";
import { CidadeProvider } from "../../database/providers/cidade";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

interface IBodyProps extends Omit<Icidade, "id"> {}

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
): Promise<void> => {
    if (!req.params.id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parametro 'id' precisa ser informado!",
            },
        });
    }

    const result = await CidadeProvider.updateById(
        Number(req.params.id),
        req.body
    );

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    res.status(StatusCodes.OK).json(result);
};
