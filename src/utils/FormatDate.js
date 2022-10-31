export default function FormatDate(transacoes) {
    let mesesEAnos = transacoes.map((transacao) => {
        const mes = transacao.date.split("-")[1];
        const ano = transacao.date.split("-")[0];

        let formatado = "";
        switch (mes) {
            case "01":
                formatado = `JAN/${ano}`;
                break;

            case "02":
                formatado = `FEV/${ano}`;
                break;

            case "03":
                formatado = `MAR/${ano}`;
                break;

            case "04":
                formatado = `ABR/${ano}`;
                break;

            case "05":
                formatado = `MAI/${ano}`;
                break;

            case "06":
                formatado = `JUN/${ano}`;
                break;

            case "07":
                formatado = `JUL/${ano}`;
                break;

            case "08":
                formatado = `AGO/${ano}`;
                break;

            case "09":
                formatado = `SET/${ano}`;
                break;

            case "10":
                formatado = `OUT/${ano}`;
                break;

            case "11":
                formatado = `NOV/${ano}`;
                break;

            case "12":
                formatado = `DEZ/${ano}`;
                break;
        }

        return formatado;
    });
    return [...new Set(mesesEAnos)];
}
