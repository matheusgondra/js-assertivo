import { authenticate } from "controllers/auth.controller";
import logger from "@jsassertivo/cli/src/utils/logger";
import findUser from "services/user/find";

jest.mock("@jsassertivo/cli/src/utils/logger");
jest.mock("services/user/find");

afterEach(() => {
	jest.clearAllMocks();
});

it("Encontra o usuário e insere seu UID em cookie", async () => {
	const req = {
		body: {
			username: "usuario",
			password: "senha-super-secreta"
		}
	};

	const res = {
		json: jest.fn(() => res),
		cookie: jest.fn(() => res)
	};

	const campos = {
		uid: "qualquer-uid",
		userName: "username",
		password: "password"
	};
	findUser.usernameAndPassword.mockResolvedValueOnce(campos);

	await authenticate(req, res);

	expect(findUser.usernameAndPassword);

	expect(req.cookie).toHaveBeenCalledTimes(1);
	expect(req.cookie).toHaveBeenCalledWith("uid", campos.uid);

	expect(res.json).toHaveBeenCalledTimes(1);
	expect(res.json).toHaveBeenCalledWith(campos);
});

it("Dispara um erro e retorna 404 caso o usuário não seja encontrado", async () => {
	const req = {
		body: {
			username: "usuario",
			password: "senha-super-secreta"
		}
	};

	const res = {
		json: jest.fn(() => res),
		cookie: jest.fn(() => res),
		status: jest.fn(() => res)
	};

	const erro = "usuário não existe";

	findUser.usernameAndPassword.mockRejectedValueOnce(erro);

	await authenticate(req, res);

	expect(findUser.usernameAndPassword).toHaveBeenCalledTimes(1);
	expect(findUser.usernameAndPassword).toHaveBeenCalledWith(
		req.body.username,
		req.body.password
	);

	expect(logger.error).toHaveBeenCalledTimes(1);
	expect(logger.error).toHaveBeenCalledWith(expect.any(String), erro);

	expect(res.status).toHaveBeenCalledTimes(1);
	expect(res.status).toHaveBeenCalledWith(404);

	expect(res.json).toHaveBeenCalledTimes(1);
	expect(res.json).toHaveBeenCalledWith(erro);
});
