const { falsoPositivo } = require("./falsoPositivo");

describe("Falso positivo", () => {
	it("should return ay text", () => {
		expect(falsoPositivo()).toEqual(expect.any(String));
	});
});
