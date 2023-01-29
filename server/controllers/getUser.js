import User from "../modals/user.js";

export default async function getUser(req, res) {
    const { username } = req.params;
    try {
        const { loggedInUser } = res.locals;
        const user = await User.findOne({ username }, { password: 0, _id: 0 });
        if (!user) {
            throw new Error("User not found");
        }

        let isUserFollowing = true;
        if (!loggedInUser || loggedInUser.username === username) {
            isUserFollowing = false;
        }
        else {
            isUserFollowing = !!user.followers.filter(user => user === loggedInUser.username).length
        }
        res.status(200).json({
            username: user.username,
            following: user.following.length,
            followers: user.followers.length,
            isUserFollowing
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }

};