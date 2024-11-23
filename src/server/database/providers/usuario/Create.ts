// Inserindo um resistro no bando de dados

import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { Iusuario } from "../../models";

export const create = async (
    usuario: Omit<Iusuario, "id">
): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.USUARIO)
            .insert(usuario)
            .returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Erro ao cadastras o registro");
    } catch (error) {
        return Error("Erro ao cadastras o registro");
    }
};
