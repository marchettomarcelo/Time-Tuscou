export default function RegistroTransacao({
    id,
    amount,
    date,
    description,
    category,
}) {
    return (
        <div className="div-registro-transacao">
            <div className="infos-transacoa">
                <h3 className="titulo-transacao">{description}</h3>
                <p className="descricao-transacao">
                    {category}
                    <br />
                    {date}
                </p>
            </div>

            <h2 className="div-escolher-mes">R$ {amount}</h2>
        </div>
    );
}
