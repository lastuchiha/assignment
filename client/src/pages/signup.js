import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authcontext";

function SignUp() {

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/users", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.err) {
                    setErr(data.err)
                } else {
                    setLoggedInUser(data);
                    localStorage.setItem("loggedInUser", JSON.stringify(data));
                    navigate(`/users/${data.username}`);
                }
            });
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
            <h1>Sign Up</h1>
            <input type={"text"} placeholder="Username" onChange={e => setFormData(prev => ({
                ...prev,
                username: e.target.value
            }))} />
            <input type={"password"} placeholder="Password" onChange={e => setFormData(prev => ({
                ...prev,
                password: e.target.value
            }))} />
            {err && <p className="err">{err}</p>}
            <button>Sign Up</button>
            <Link to="/signin">Sign In</Link>
        </form>
    )
}

export default SignUp;