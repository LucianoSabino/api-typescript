import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";
import { Iusuario } from "../../models";

export const getByEmail = async (email: string): Promise<Iusuario | Error> => {
    try {
        const result = await Knex(ETableNames.USUARIO)
            .select("*")
            .where("email", "=", email)
            .first();

        if (result) return result;

        return new Error("Registro não encontrado!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o registro");
    }
};
