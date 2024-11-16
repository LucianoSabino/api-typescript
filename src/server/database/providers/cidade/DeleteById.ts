import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.CIDADE)
            .where("id", "=", id)
            .del();

        if (result > 0) return;

        return new Error("Error ao apagar o registro!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao apagar o registro!");
    }
};
