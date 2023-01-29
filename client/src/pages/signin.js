import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authcontext";
function SignIn() {
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/signin", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    setErr(data.err);
                } else {
                    setLoggedInUser(data);
                    navigate(`/users/${data.username}`);
                    localStorage.setItem("loggedInUser", JSON.stringify(data));
                }
            })
    }

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [err, setErr] = useState("");
    const { setLoggedInUser } = useAuthContext();
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type={"text"} placeholder="Username" onChange={e => setFormData(prev => ({
                ...prev,
                username: e.target.value
            }))} />
            <input type={"password"} placeholder="Password" onChange={e => setFormData(prev => ({
                ...prev,
                password: e.target.value
            }))} />
            {err && <p className="err">{err}</p>}
            <button>Sign In</button>
            <Link to="/signup">Sign Up</Link>
        </form>
    )
}

export default SignIn;