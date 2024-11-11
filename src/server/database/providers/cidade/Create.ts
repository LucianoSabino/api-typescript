// Inserindo um resistro no bando de dados

import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { Icidade } from "../../models";

export const create = async (
    cidade: Omit<Icidade, "id">
): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.CIDADE)
            .insert(cidade)
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
