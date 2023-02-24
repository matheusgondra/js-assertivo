const { calculaDesconto, somaHorasExtras } = require("./operacoes");

describe("Operações", () => {
	// beforeAll(() => {
	// 	console.log("Hook antes de todos os testes");
	// });

	// beforeEach(() => {
	// 	console.log("Hook antes de cada teste");
	// });

	// afterAll(() => {
	// 	console.log("Hook depois de todos os testes");
	// });

	// afterEach(() => {
	// 	console.log("Hook depois de cada teste");
	// });

	it("should sum extra hours.", () => {
		const esperado = 10;
		const retornado = somaHorasExtras(5, 5);

		expect(retornado).toBe(esperado);
	});

	it("should calculate the discount", () => {
		const esperado = 5;
		const retornado = calculaDesconto(10, 5);

		expect(retornado).toBe(esperado);
	});
});
