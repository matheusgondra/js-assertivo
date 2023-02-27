import { getUserByUid } from "../../../src/database/user/read";
import { loadDatabase } from "../../../src/database/file";

jest.mock("../../../src/database/path");
jest.mock("../../../src/database/file");

const mockUsuario = {
	uid: "abc-1234",
	userName: "nomeDeUsuario",
	name: "nome",
	lastName: "DeUsuario",
	email: "email.nome@usuario.com",
	password: "senhasupersecreta",
	role: "USER"
};

loadDatabase.mockResolvedValue([mockUsuario]);

it("Encontra usuário quando encontra seu UID", async () => {
	const usuario = await getUserByUid("abc-1234");
	expect(usuario).toEqual(mockUsuario);
});

it("Dispara um erro caso o usuário não seja encontrado", async () => {
	try {
		await getUserByUid("uid-nao-existente");
	} catch (err) {
		expect(err.message).toEqual("Não existe usuário com uid informado.");
	}
});
