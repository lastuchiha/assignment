import User from "../modals/user.js";

export default async function getFollowers(req, res) {
    const { username } = req.params;

    try {
        const following = await User.findOne({ username }, { following: 1, _id: 0 });
        res.status(200).json(following);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}