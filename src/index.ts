import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const port = process.env.PORT || 10000;

const startServer = () => {
    app.listen(port, () => console.log(`Servidor rodando! na porta ${port}`));
};

if (process.env.IS_LOCALHOST !== "true") {
    Knex.migrate
        .latest()
        .then(() => {
            startServer();
        })
        .catch(console.log);
} else {
    startServer();
}
