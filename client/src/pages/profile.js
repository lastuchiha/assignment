import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/authcontext";

function Profile() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [isUserFollowing, setIsUserFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [err, setErr] = useState("");
    const { loggedInUser, setLoggedInUser } = useAuthContext();
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFollowers([]);
        setFollowing([]);
        setErr("");
        fetch(`/users/${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.err)
                    setUserNotFound(true);
                setProfile(data);
                setIsUserFollowing(data.isUserFollowing);
            });
    }, [username, loggedInUser, isUserFollowing]);

    const follow = () => {
        fetch(`/users/${username}/${!isUserFollowing ? "follow" : "unfollow"}`, {
            method: !isUserFollowing ? "POST" : "DELETE",
        }).then(res => res.json())
            .then(data => {
                if (!data.err) {
                    setIsUserFollowing(prev => !prev);
                } else {
                    setErr(data.err);
                }
            })
    }

    const getFollowing = () => {
        fetch(`/users/${username}/following`)
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    setFollowing(data.following);
                } else {
                    setErr(data.err);
                }
            })
    }

    const getFollowers = () => {
        fetch(`/users/${username}/followers`)
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    setFollowers(data.followers);
                }
            })
    }

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        fetch(`/logout`).then(() => setLoggedInUser(null));
    }
    return (
        <>
            <header>
                {loggedInUser ? <p>Logged in as: <b>{loggedInUser.username}</b>
                    <button onClick={logout}>Logout</button>
                </p> : <button onClick={() => navigate("/signin")}>Login</button>}
            </header>
            <main>
                {userNotFound ? <h2>User Not found</h2> :
                    <>
                        <h1>{profile?.username}</h1>
                        {err && <p className="err">{err}</p>}
                        <button onClick={follow}>{isUserFollowing ? "Unfollow" : "Follow"}</button>
                        <section>
                            <div>
                                <h5 onClick={getFollowing}>Following: {profile?.following}</h5>
                                <ul>
                                    {following.map((user, i) => <li key={i}>
                                        <Link to={`/users/${user}`}>{user}</Link>
                                    </li>)}
                                </ul>
                            </div>
                            <div>
                                <h5 onClick={getFollowers}>Followers: {profile?.followers}</h5>
                                <ul>
                                    {followers.map((user, i) => <li key={i}>
                                        <Link to={`/users/${user}`}>{user}</Link>
                                    </li>)}
                                </ul>
                            </div>
                        </section>
                    </>
                }
            </main>
        </>
    )
}

export default Profile;