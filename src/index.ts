import { app } from "./server/server";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`servidor rodando! na porta ${port}`));
