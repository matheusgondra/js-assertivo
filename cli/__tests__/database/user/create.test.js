import { createUser } from "../../../src/database/user/create";
import * as file from "../../../src/database/file";
import ROLES from "../../../src/constants/roles";

jest.mock("../../../src/database/file");
jest.mock("../../../src/database/path");

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
