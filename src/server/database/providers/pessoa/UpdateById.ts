import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";
import { Ipessoa } from "../../models";

export const updateById = async (
    id: number,
    pessoa: Omit<Ipessoa, "id">
): Promise<void | Error> => {
    try {
        // Verificando se a cidade existe
        const [{ count }] = await Knex(ETableNames.CIDADE)
            .where("id", "=", pessoa.cidadeId)
            .count<[{ count: number }]>("* as count");

        if (count === 0) {
            return new Error("A cidade usada no cadastro não encontrada");
        }

        const result = await Knex(ETableNames.PESSOA)
            .update(pessoa)
            .where("id", "=", id);

        if (result > 0) return;

        return new Error("Error ao atualizar o registro!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao atualizar o registro!");
    }
};
