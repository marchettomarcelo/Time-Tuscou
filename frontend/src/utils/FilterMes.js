export default function FilterMes(transacoes, data) {
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

    const x = transacoes.filter((transacao) => {
        const mesTransacao = transacao.date.split("-")[1];
        const anoTransacao = transacao.date.split("-")[0];

        return (
            transacao.date.split("-")[0] === ano.toString() &&
            // convert num mes to strinf
            transacao.date.split("-")[1] === numMes.toString()
        );
    });

    return x;
}
