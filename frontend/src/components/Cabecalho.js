import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function Cabecalho({ nome, meses, changeMesAnalizado }) {
    const [mes, setMes] = useState("");
    useEffect(() => {
        if (meses) {
            setMes(meses[0]);
        }
    }, [meses]);

    const handleChange = (event) => {
        setMes(event.target.value);
        changeMesAnalizado(event.target.value);
    };

    if (meses && nome) {
        return (
            <div className="div-cabecalho">
                <div className="div-bom-dia">
                    Bom dia, <br />
                    <h1 className="nome-usuario">{nome}</h1>
                </div>
                <div className="div-escolher-mes">
                    <p>Escolha um mês:</p>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            Mês
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mes || ""}
                            label="Mes"
                            onChange={handleChange}
                        >
                            {meses.map((mes, id) => {
                                return (
                                    <MenuItem
                                        key={Math.random() * id}
                                        onChange={handleChange}
                                        value={mes || ""}
                                    >
                                        {mes || ""}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}
