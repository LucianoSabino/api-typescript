import { query, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { PessoaProvider } from "../../database/providers/pessoa";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

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
    const query = req.query as unknown as IQueryProps;
    const result = await PessoaProvider.getAll(
        query.page || 1,
        query.limit || 7,
        query.filter || ""
    );
    const count = await PessoaProvider.count(query.filter);

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    } else if (count instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            },
        });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    if (count instanceof Error) {
        console.error(count.message); // Loga a mensagem de erro para depuração
        res.setHeader("x-total-count", "0"); // Define um valor padrão para o cabeçalho em caso de erro
    } else {
        res.setHeader("x-total-count", count);
    }

    res.status(StatusCodes.OK).json(result);
};
