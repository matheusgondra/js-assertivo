const somaHorasExtras = (salario, valorHoraExtra) => {
	return salario + valorHoraExtra;
};

const calculaDesconto = (salario, descontos) => {
	return salario - descontos;
};

module.exports = { somaHorasExtras, calculaDesconto };
