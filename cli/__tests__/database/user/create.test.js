import { createUser } from "../../../src/database/user/create";
import * as file from "../../../src/database/file";
import path from "../../../src/database/path";

jest.mock("../../../src/database/file");
jest.mock("../../../src/database/path");

const usuario = {
	email: "qualquer@email.com",
	password: "senha1234",
	userName: "usuárioQualquer",
	name: "Usuário",
	lastName: "Qualquer"
};

it("Cria usuário corretamente", async () => {
	const user = await createUser(usuario);
});
