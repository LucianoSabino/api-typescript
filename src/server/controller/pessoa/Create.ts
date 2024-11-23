import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Ipessoa } from "../../database/models";
import { PessoaProvider } from "../../database/providers/pessoa";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

// Exemplo mais simples, no caso so de baixo é exportado so por sematica mesmo. mas pode ser assim como esta comentado
// interface ICidade {
//     nome: string;
// }

interface IBodyProps extends Omit<Ipessoa, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email(),
            cidadeId: yup.number().integer().required(),
            nomeCompleto: yup.string().required().min(3),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
): Promise<void> => {
    const result = await PessoaProvider.create(req.body);

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
        return;
    }

    res.status(StatusCodes.CREATED).json(result);
};
