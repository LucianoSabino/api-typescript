import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
    nome: string;
    estado: string;
}

// Validação qualquer coisa e na documentação do yup
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().max(2).min(2),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validateData: ICidade | undefined = undefined;

    try {
        validateData = await bodyValidation.validate(req.body, {
            abortEarly: false,
        });

        const cidade = req.body.nome;
        const estado = req.body.estado;
        res.json({
            Retorno: { "Sua cidade é:": cidade, "Seu estado é:": estado },
        });
        console.log(validateData);
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const validatonErrors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
            if (!error.path) return;

            validatonErrors[error.path] = error.message;
        });

        res.status(StatusCodes.BAD_REQUEST).json({
            Messagem: { Error: validatonErrors },
        });
    }
};
