import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import { ProfileProvider } from "./context/ProfileContext";

import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";

function App() {
    return (
        <Router>
            <main>
                <AuthProvider>
                    <ProfileProvider>
                        <Switch>
                            <PrivateRoute
                                component={ProtectedPage}
                                path="/protected"
                                exact
                            />
                            <Route component={Login} path="/login" />
                            <Route component={Register} path="/cadastro" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </ProfileProvider>
                </AuthProvider>
                {/* <Footer /> */}
            </main>
        </Router>
    );
}

export default App;
