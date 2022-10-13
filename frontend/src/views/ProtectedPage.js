import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import Cabecalho from "../components/Cabecalho";
import DashBoard from "../components/DashBoard";

function ProtectedPage() {
    const [res, setRes] = useState("");
    const api = useAxios();
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/test/");
                console.log(response.data.response);
                setRes(response.data.response);
            } catch {
                setRes("Something went wrong");
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="div-main-page">
            <Cabecalho nome={res.nome} meses={res.meses} />
            <DashBoard />

            <Button variant="contained" color="primary" onClick={logoutUser}>
                Log out
            </Button>
        </div>
    );
}

export default ProtectedPage;
