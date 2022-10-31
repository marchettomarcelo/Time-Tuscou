import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "./ProtectedPage";

const Home = () => {
    const { user } = useContext(AuthContext);
    return <>{user ? <ProtectedPage /> : <h1>You are on home page!</h1>}</>;
};

export default Home;
