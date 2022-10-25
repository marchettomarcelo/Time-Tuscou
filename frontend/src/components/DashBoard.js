import Grafico from "./Gafico";

export default function DashBoard({ transactionsFiltradas }) {
    const nTransacoes = transactionsFiltradas.length;
    let totalReceitas = 0;

    for (let i = 0; i < nTransacoes; i++) {
        const transacao = transactionsFiltradas[i];

        totalReceitas += parseFloat(transacao.amount);
    }
    let novo = [...transactionsFiltradas].map((transacao) => {
        return {
            ...transacao,
            date: new Date(transacao.date),
        };
    });

    novo.sort((a, b) => a.date - b.date);

    // [ 'Test 2', 'Test 1', 'Test 3' ]
    console.log(novo);

    const mediaReceitas = (totalReceitas / nTransacoes).toFixed(2);

    return (
        <div className="div-dashboard">
            <div className="div-bom-dia">
                <h2 className="infos-principais">Média transacões:</h2>{" "}
                <p>R$ {mediaReceitas}</p>
                <h2 className="infos-principais">Gasto do mes:</h2>
                <p>R$ {totalReceitas}</p>
                {/* <h2 className="infos-principais">Dias restantes:</h2>
                <p> 27</p> */}
            </div>

            <div className="div-dentro-dashboard">
                <Grafico />
            </div>
        </div>
    );
}
