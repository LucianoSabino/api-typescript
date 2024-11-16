import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Apagar", () => {
    it("Apaga registro", async () => {
        const res1 = await testServer.post("/cidade").send({ nome: "Cruz" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidade/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.OK);
    }, 10000);
    it("Tenta apagar registro que não existe", async () => {
        const res1 = await testServer.delete("/cidade/99999").send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
