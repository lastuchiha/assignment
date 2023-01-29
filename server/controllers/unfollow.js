import User from "../modals/user.js";

/*
    1.GET current user A
    2.GET specified user B
    3.UPDATE "followers" of User B
    4.UPDATE "following" of User A
    5.Made 3. and 4. as a transaction so if one statement fails
        another statement also fails
*/

export default async function follow(req, res) {
    try {
        const { username } = req.params;
        const { loggedInUser } = res.locals;

        await User.findOneAndUpdate({ username }, {
            $pull: { followers: loggedInUser.username }
        });

        await User.findOneAndUpdate({ username: loggedInUser.username }, {
            $pull: { following: username }
        })

        res.status(200).json({ msg: "Unfollowed the user." });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}