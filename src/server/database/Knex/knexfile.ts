import { Knex } from "knex";
import path from "path";

// Informaçoes do banco de dados
export const development: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    // Canimho do arquivo Onde quero salvar o banco de dados sqlite, nesse caso vai ser na raiz do projeto
    connection: {
        filename: path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "database.sqlite"
        ),
    },

    // Canimho do arquivo Onde quero salvar as migrasoes
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations"),
    },
    seeds: {
        directory: path.resolve(__dirname, "..", "seeds"),
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run("PRAGMA foreign_keys = ON");
            done();
        },
    },
};

// Aqui é para os teste, ou seja os dados não vsi ficar salvo
export const test: Knex.Config = {
    ...development,
    connection: ":memory:",
};
export const production: Knex.Config = {
    ...development,
};
