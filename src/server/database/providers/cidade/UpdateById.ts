import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";
import { Icidade } from "../../models";

export const updateById = async (
    id: number,
    cidade: Omit<Icidade, "id">
): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.CIDADE)
            .update(cidade)
            .where("id", "=", id);

        if (result > 0) return;

        return new Error("Error ao atualizar o registro!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao atualizar o registro!");
    }
};
