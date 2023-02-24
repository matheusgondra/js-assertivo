import parse, { validateArgs } from "../../src/utils/args";

const dados = {
	username: "admin",
	password: "admin",
	operation: "operacao",
	data: {
		uid: "abc-123"
	}
};

it("Faz o parse dos argumentos da CLI", () => {
	const argumentos = [
		`C:\\Program Files\\nodejs\\node.exe`,
		`C:\\Users\\matnas\\AppData\\Roaming\\npm\\node_modules\\@jsassertivo\\cli\\cli.js`,
		`--username=admin`,
		`--password=admin`,
		`--operation=operacao`,
		`--data={"uid": "abc-123"}`
	];

	const resultado = parse(argumentos);
	expect(resultado).toEqual(dados);
});

describe("Validação dos argumentos da CLI", () => {
	it("Valida com sucesso os campos informados", () => {
		const campos = ["username", "password", "operation", "data"];

		expect(validateArgs(dados, campos).valid).toEqual(true);
		expect(validateArgs(dados).valid).toEqual(true);
	});

	it("Valida os cenários de erro e retorna uma mensagem", () => {
		expect(validateArgs()).toEqual({
			valid: false,
			message: "Você precisa fornecer os argumentos corretos para a CLI"
		});
		expect(validateArgs(dados, ["nome"])).toEqual({
			valid: false,
			message: "Você precisa informar o argumento nome"
		});
	});
});
