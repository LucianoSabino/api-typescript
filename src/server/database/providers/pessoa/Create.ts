// Inserindo um resistro no bando de dados

import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { Ipessoa } from "../../models";
import { number } from "yup";

export const create = async (
    pessoa: Omit<Ipessoa, "id">
): Promise<number | Error> => {
    try {
        // Verificando se a cidade existe
        const [{ count }] = await Knex(ETableNames.CIDADE)
            .where("id", "=", pessoa.cidadeId)
            .count<[{ count: number }]>("* as count");

        if (count === 0) {
            return new Error("A cidade usada no cadastro não encontrada");
        }

        const [result] = await Knex(ETableNames.PESSOA)
            .insert(pessoa)
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
