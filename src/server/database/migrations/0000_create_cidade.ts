import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.CIDADE, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome", 100).index().notNullable();
            table.comment("Tabela usada para armazenar cidades do sistema");
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.CIDADE}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.CIDADE).then(() => {
        console.log(`# Drop table ${ETableNames.CIDADE}`);
    });
}
