import { getUserByUid } from "database/user/read";
import { loadDatabase } from "database/file";

jest.mock("database/path");
jest.mock("database/file");

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
	expect.assertions(1);
	const usuario = await getUserByUid("abc-1234");
	expect(usuario).toEqual(mockUsuario);
});

it("Dispara um erro caso o usuário não seja encontrado", async () => {
	expect.assertions(1);
	try {
		await getUserByUid("uid-nao-existente");
	} catch (err) {
		expect(err.message).toEqual("Não existe usuário com uid informado.");
	}
});
