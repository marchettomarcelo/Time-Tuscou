import { useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // handle input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.);

        loginUser(email, senha);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login </h1>

            <TextField
                placeholder="Insira seu email"
                id="standard-basic"
                label="Username"
                variant="standard"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                required
            />

            <TextField
                placeholder="Insira sua senha"
                id="standard-basic"
                label="Senha"
                variant="standard"
                value={senha}
                type="password"
                onChange={handleSenhaChange}
                fullWidth
                required
            />

            <Button
                style={{ marginTop: "2rem" }}
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
            >
                Login
            </Button>

            <p>
                Ainda não tem conta?{" "}
                <Button
                    style={{ textTransform: "none" }}
                    href="cadastro"
                    variant="text"
                >
                    Cadastre-se
                </Button>{" "}
            </p>
        </form>
    );
};

export default LoginPage;
