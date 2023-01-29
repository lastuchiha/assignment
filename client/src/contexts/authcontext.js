import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

    return (
        <AuthContext.Provider value={{
            loggedInUser,
            setLoggedInUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}