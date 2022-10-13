import Grafico from "./Gafico";

export default function DashBoard() {
    return (
        <div className="div-dashboard">
            <div className="div-bom-dia">
                <h2 className="infos-principais">Média transacões:</h2>{" "}
                <p>R$ 1000,00</p>
                <h2 className="infos-principais">Gasto do mes:</h2>
                <p>R$ 3045,00</p>
                <h2 className="infos-principais">Dias restantes:</h2>
                <p> 27</p>
            </div>

            <div className="div-dentro-dashboard">
                <Grafico />
            </div>
        </div>
    );
}
