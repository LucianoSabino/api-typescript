import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Icidade } from "../../database/models";
import { CidadeProvider } from "../../database/providers/cidade";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

// Exemplo mais simples, no caso so de baixo é exportado so por sematica mesmo. mas pode ser assim como esta comentado
// interface ICidade {
//     nome: string;
// }

interface IBodyProps extends Omit<Icidade, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3).max(100),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await CidadeProvider.create(req.body);

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    res.status(StatusCodes.CREATED).json(result);
};
