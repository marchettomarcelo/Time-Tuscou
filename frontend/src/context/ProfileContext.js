import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";

const ProfileContext = createContext();

export default ProfileContext;

export const ProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);

    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/profile/${user.user_id}`);
                const x = response.data.response.perfil;

                setUserProfile(x);
            } catch (e) {
                console.log(e);
            }
        };
        if (user) {
            if (currentUser !== user) {
                setCurrentUser(user);
                fetchData();
            }
        }
    }, [user, currentUser, api]);

    const contextData = {
        userProfile,
    };

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    );
};
