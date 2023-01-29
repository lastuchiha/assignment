import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authcontext";

function Protected({ children }) {
    const { loggedInUser } = useAuthContext();

    return loggedInUser ? children : <Navigate to="signin" />
}

export default Protected;