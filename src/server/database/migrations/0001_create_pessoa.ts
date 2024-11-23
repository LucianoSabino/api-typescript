import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.PESSOA, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nomeCompleto").index().notNullable(); // Valor padrão se não for fornecido
            table.string("email").unique().notNullable(); // Valor padrão se não for fornecido

            // Vinculação com a tabela cidade
            table
                .bigInteger("cidadeId")
                .index()
                .notNullable()
                .references("id")
                .inTable(ETableNames.CIDADE)
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");

            table.comment("Tabela usada para armazenar pessoa no sistema");
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.PESSOA}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.PESSOA).then(() => {
        console.log(`# Drop table ${ETableNames.PESSOA}`);
    });
}
