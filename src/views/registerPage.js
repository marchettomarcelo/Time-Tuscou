import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { TextField, Button } from "@mui/material";

function Register() {
    const [email, setEmail] = useState("");

    const [nome, setNome] = useState("");
    const [aniversario, setAniversario] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");

    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const { registerUser } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleAniversarioChange = (e) => {
        setAniversario(e.target.value);
    };

    const handleTelefoneChange = (e) => {
        setTelefone(e.target.value);
    };

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };
    const handleSenha2Change = (e) => {
        setSenha2(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerUser(email, senha, senha2, nome, aniversario, telefone, cpf);
    };

    // name,
    //     email,
    //     birth_date,
    //     phone,
    //     cpf

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Cadastro </h1>

            <TextField
                placeholder="Insira seu email"
                id="standard-basic"
                label="Email"
                variant="standard"
                value={email}
                required
                onChange={handleEmailChange}
                fullWidth
            />
            <TextField
                placeholder="Insira seu nome"
                id="standard-basic"
                label="Nome"
                variant="standard"
                value={nome}
                required
                onChange={handleNomeChange}
                fullWidth
            />
            <TextField
                placeholder="Insira sua data de nascimento"
                id="standard-basic"
                // label="Data de nascimento"
                variant="standard"
                type="date"
                value={aniversario}
                required
                onChange={handleAniversarioChange}
                fullWidth
            />

            <TextField
                placeholder="Insira seu telefone"
                id="standard-basic"
                label="Telefone"
                variant="standard"
                value={telefone}
                required
                onChange={handleTelefoneChange}
                fullWidth
            />
            <TextField
                placeholder="Insira seu cpf"
                id="standard-basic"
                label="CPF"
                variant="standard"
                value={cpf}
                required
                onChange={handleCpfChange}
                fullWidth
            />

            <TextField
                placeholder="Insira sua senha"
                id="standard-basic"
                label="Senha"
                variant="standard"
                value={senha}
                type="password"
                required
                onChange={handleSenhaChange}
                fullWidth
            />
            <TextField
                placeholder="Insira sua senha novamete"
                id="standard-basic"
                label="Confirme sua senha"
                variant="standard"
                required
                type="password"
                value={senha2}
                onChange={handleSenha2Change}
                fullWidth
            />

            <Button
                style={{ marginTop: "2rem" }}
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
            >
                Cadastrar
            </Button>

            <p>
                Já tem conta?{" "}
                <Button
                    style={{ textTransform: "none" }}
                    href="/login"
                    variant="text"
                >
                    Login
                </Button>{" "}
            </p>
        </form>
    );
}

export default Register;
