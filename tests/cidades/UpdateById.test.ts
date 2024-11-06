import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GeAll", () => {
    it("Atualiza registro", async () => {
        const res1 = await testServer.post("/cidade").send({ nome: "Cruz" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/cidade/${res1.body}`)
            .send({ nome: "Cruz" });

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    });
    it("Tenta atualizar registro não existe", async () => {
        const res1 = await testServer
            .put("/cidade/99999")
            .send({ nome: "Crrrr" });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
