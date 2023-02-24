const funcaoInterna = () => {
	console.log("salva algum dado");
};

const falsoPositivo = () => {
	funcaoInterna();
	return "texto qualquer";
};

module.exports = { falsoPositivo };
