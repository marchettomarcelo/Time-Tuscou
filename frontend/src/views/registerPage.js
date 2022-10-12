import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { TextField, Button } from "@mui/material";

function Register() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const { registerUser } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };
    const handleSenha2Change = (e) => {
        setSenha2(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerUser(email, senha, senha2);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Cadastro </h1>

            <TextField
                placeholder="Insira seu email"
                id="standard-basic"
                label="Username"
                variant="standard"
                value={email}
                required
                onChange={handleEmailChange}
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
