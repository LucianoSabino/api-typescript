// Passando as conxão

import knex from "knex";
import pg from "pg";
import "dotenv/config";
import { development, production, test } from "./knexfile";

// Verificando se estamos no ambiente de produção
// Tratamento para numero
if (process.env.NODE_ENV === "production") {
    pg.types.setTypeParser(20, "text", parseInt);
}

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case "production":
            return production;
        case "test":
            return test;
        default:
            return development;
    }
};

export const Knex = knex(getEnviroment());
