import { createUser } from "database/user/create";
import * as file from "database/file";
import ROLES from "constants/roles";

jest.mock("database/file");
jest.mock("database/path");

const usuario = {
	email: "qualquer@email.com",
	password: "senha1234",
	userName: "usuárioQualquer",
	name: "Usuário",
	lastName: "Qualquer"
};

beforeEach(() => {
	file.loadDatabase.mockResolvedValueOnce([]);
});

afterEach(() => {
	jest.clearAllMocks();
});

afterAll(() => {
	jest.restoreAllMocks();
});

it("Cria usuário corretamente", async () => {
	expect.assertions(4);
	const user = await createUser(usuario);

	expect(file.loadDatabase).toHaveBeenCalledTimes(1);
	expect(file.saveDatabase).toHaveBeenCalledTimes(1);
	expect(file.saveDatabase).toHaveBeenCalledWith([user]);
	expect(user).toEqual({
		...usuario,
		uid: expect.any(String),
		role: ROLES.USER
	});
});

it("Cria usuário corretamente com role ADMIN", async () => {
	expect.assertions(4);
	const user = await createUser({ ...usuario, role: ROLES.ADMIN });

	expect(file.loadDatabase).toHaveBeenCalledTimes(1);
	expect(file.saveDatabase).toHaveBeenCalledTimes(1);
	expect(file.saveDatabase).toHaveBeenCalledWith([user]);
	expect(user).toEqual({
		...usuario,
		uid: expect.any(String),
		role: ROLES.ADMIN
	});
});
