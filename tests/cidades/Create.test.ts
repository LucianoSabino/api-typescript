import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
    it("Cria registro", async () => {
        const res1 = await testServer.post("/cidade").send({ nome: "Cruz" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });
    it("Tenta criar um registro com o nome curto", async () => {
        const res1 = await testServer.post("/cidade").send({ nome: "C" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("Message.Error.body.nome");
    });
});
