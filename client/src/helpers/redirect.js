import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authcontext";

export default function Redirect({ children }) {
    const { loggedInUser } = useAuthContext();
    console.log(loggedInUser)
    return loggedInUser ? { children } : <Navigate to={`/users/${loggedInUser.username}`} />
}