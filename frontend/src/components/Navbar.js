import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <nav>
            <div>
                <div>
                    {user ? (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/protected">Protected Page</Link>
                            <button onClick={logoutUser}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Button variant="outlined" href="/login">
                                Login
                            </Button>

                            <Button variant="outlined" href="/cadastro">
                                Registro
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
