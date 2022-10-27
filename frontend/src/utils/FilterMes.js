export default function FilterMes(transacoes, data) {
    console.log(transacoes, data);

    const mes = data.split("/")[0];
    const ano = data.split("/")[1];

    let numMes = 0;
    switch (mes) {
        case "JAN":
            numMes = 1;
            break;
        case "FEV":
            numMes = 2;
            break;
        case "MAR":
            numMes = 3;
            break;
        case "ABR":
            numMes = 4;
            break;
        case "MAI":
            numMes = 5;
            break;
        case "JUN":
            numMes = 6;
            break;
        case "JUL":
            numMes = 7;
            break;
        case "AGO":
            numMes = 8;
            break;
        case "SET":
            numMes = 9;
            break;
        case "OUT":
            numMes = 10;
            break;
        case "NOV":
            numMes = 11;
            break;
        case "DEZ":
            numMes = 12;
            break;
    }

    const transactionsFiltradas = transacoes.filter((transacao) => {
        console.log(transacao.date.split("-")[0], ano.toString());
        console.log(transacao.date.split("-")[1], numMes.toString());
        return (
            transacao.date.split("-")[0] === ano.toString() &&
            // convert num mes to strinf
            parseInt(transacao.date.split("-")[1]) === parseInt(numMes)
        );
    });

    let novo = [...transactionsFiltradas].map((transacao) => {
        return {
            ...transacao,
            date: new Date(transacao.date),
        };
    });

    novo.sort((a, b) => a.date - b.date);

    // change the date format to transactionsFiltradas. find by id an chanfe

    const novoRetornado = novo.map((transacao) => {
        for (let i = 0; i < transactionsFiltradas.length; i++) {
            const transacaoFiltrada = transactionsFiltradas[i];

            if (transacaoFiltrada.id === transacao.id) {
                return {
                    ...transacao,
                    date: transacaoFiltrada.date,
                };
            }
        }
    });

    return novoRetornado;
}
