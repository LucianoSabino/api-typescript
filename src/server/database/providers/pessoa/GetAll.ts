import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";
import { Ipessoa } from "../../models";

export const getAll = async (
    page: number,
    limit: number,
    filter: string
): Promise<Ipessoa[] | Error> => {
    try {
        const result = await Knex(ETableNames.PESSOA)
            .select("*")
            .orWhere("nome", "like", `%${filter}`)
            .offset((page - 1) * limit)
            .limit(limit);

        return result;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar os registros!");
    }
};
