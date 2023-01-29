function logout(req, res) {
    res.clearCookie("accessToken", { domain: "localhost", path: "/" })
    res.end();
}

export default logout;