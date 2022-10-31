import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import FilterMes from "../utils/FilterMes";
import FormatDate from "../utils/FormatDate";
import AuthContext from "../context/AuthContext";
import ProfileContext from "../context/ProfileContext";
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
    const [transactionsFiltradas, setTransactionsFiltradas] = useState([]);
    const api = useAxios();
    const { logoutUser } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);

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

                setTransactions(transacoes);

                const datasFormatadas = FormatDate(transacoes);

                setMesesTransacoes(datasFormatadas);

                const transacoesFiltradas = FilterMes(
                    transacoes,
                    datasFormatadas[0]
                );

                setTransactionsFiltradas(transacoesFiltradas);
            } catch {
                // alert("Something went wrong");
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeMesAnalizado = async (mes) => {
        const transacoesFiltradas = FilterMes([...transactions], mes);
        console.log(transactions);

        setTransactionsFiltradas(transacoesFiltradas);

        setMesAnalizado(mes);
        console.log("asjodncasdnclasdjcalksjdnclakjsndckjnasdlkjcnajsdcljkasd");
        console.log(transactionsFiltradas);
    };

    const adicionarTransacao = async (novaTransacao) => {
        // Fazer request pra base

        const response = await api.post("/transactions/", novaTransacao);
        if (response.status === 201) {
            // append novaTransacao a transactions
            setTransactions([...transactions, novaTransacao]);
            window.location.reload();
        } else {
            alert("Erro ao adicionar transação");
        }
    };

    const clickEdit = async (id) => {
        // make delete request
        console.log(id);

        const response = await api.delete(`/transactions/${id}`);
        if (response.status === 200) {
            const transacoesFiltradas = transactions.filter(
                (transacao) => transacao.id !== id
            );
            setTransactions(transacoesFiltradas);
            // reload page
            window.location.reload();
        }
    };

    if (res && transactions && mesesTransacoes && userProfile) {
        return (
            <div className="div-main-page">
                <Cabecalho
                    nome={userProfile.name}
                    meses={mesesTransacoes}
                    changeMesAnalizado={changeMesAnalizado}
                />
                <DashBoard transactionsFiltradas={transactionsFiltradas} />

                <BotoesInserir adicionarTransacao={adicionarTransacao} />

                {[...transactionsFiltradas].map((transacao, id) => {
                    return (
                        <RegistroTransacao
                            key={Math.random()}
                            id={transacao.id}
                            amount={transacao.amount}
                            date={transacao.date}
                            description={transacao.description}
                            category={transacao.category}
                            clickEdit={clickEdit}
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
