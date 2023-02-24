import logger from "../../src/utils/logger";

const spyLog = jest.spyOn(console, "log").mockImplementation();
const spyError = jest.spyOn(console, "error").mockImplementation();

describe("Função logging", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("Funções de logging: log", () => {
		logger.log("teste");
		expect(spyLog).toHaveBeenCalledTimes(1);
	});

	it("Funções de logging: success", () => {
		logger.success("teste");
		expect(spyLog).toHaveBeenCalledTimes(1);
	});

	it("Funções de logging: error", () => {
		logger.error("teste");
		expect(spyError).toHaveBeenCalledTimes(1);
	});
});
