import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import FilterMes from "../utils/FilterMes";
import FormatDate from "../utils/FormatDate";
import AuthContext from "../context/AuthContext";
import Cabecalho from "../components/Cabecalho";
import DashBoard from "../components/DashBoard";
import BotoesInserir from "../components/BotoesInserir";
import RegistroTransacao from "../components/RegistroTransacao";
import { Button } from "@mui/material";

function ProtectedPage() {
    const [res, setRes] = useState("");
    const [mesesTransacoes, setMesesTransacoes] = useState([]);
    const [mesAnalizado, setMesAnalizado] = useState("JAN/2021");
    const [transactions, setTransactions] = useState("");
    const [transactionsFiltradas, setTransactionsFiltradas] = useState("");
    const api = useAxios();
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/test/");

                setRes(response.data.response);
            } catch {
                setRes("Something went wrong");
            }

            try {
                const response = await api.get("/transactions/");
                const transacoes = response.data.response;

                console.log(transacoes);

                setTransactions(transacoes);

                const datasFormatadas = FormatDate(transacoes);

                console.log(datasFormatadas);
                setMesesTransacoes(datasFormatadas);

                const transacoesFiltradas = FilterMes(
                    transacoes,
                    datasFormatadas[0]
                );
                console.log(transacoesFiltradas);
                setTransactionsFiltradas(transacoesFiltradas);
            } catch {
                alert("Something went wrong");
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeMesAnalizado = (mes) => {
        setMesAnalizado(mes);

        const transacoesFiltradas = FilterMes([...transactions], mes);
        // console.log(transacoesFiltradas);
        setTransactionsFiltradas(transacoesFiltradas);
    };

    const adicionarTransacao = async (novaTransacao) => {
        // Fazer request pra base

        const response = await api.post("/transactions/", novaTransacao);
        if (response.status === 201) {
            // append novaTransacao a transactions
            setTransactions([...transactions, novaTransacao]);
        } else {
            alert("Erro ao adicionar transação");
        }
    };

    if (res && transactions && mesesTransacoes) {
        return (
            <div className="div-main-page">
                <Cabecalho
                    nome={res.nome}
                    meses={mesesTransacoes}
                    changeMesAnalizado={changeMesAnalizado}
                />
                <DashBoard />

                <BotoesInserir adicionarTransacao={adicionarTransacao} />

                {[...transactionsFiltradas].map((transacao, id) => {
                    return (
                        <RegistroTransacao
                            key={id}
                            id={transacao.id}
                            amount={transacao.amount}
                            date={transacao.date}
                            description={transacao.description}
                            category={transacao.category}
                        />
                    );
                })}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={logoutUser}
                >
                    Log out
                </Button>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default ProtectedPage;
