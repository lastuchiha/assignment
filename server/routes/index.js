import { Router } from "express";
import getFollowers from "../controllers/getFollowers.js";
import getFollowing from "../controllers/getFollowing.js";
import getUser from "../controllers/getUser.js";
import signup from "../controllers/signup.js";
import signin from "../controllers/signin.js"
import follow from "../controllers/follow.js";
import unfollow from "../controllers/unfollow.js";
import logout from "../controllers/logout.js";
import auth from "../middleware/auth.js"
/* 
    ROUTES:

    POST /users: Create a new user account
    GET /users/:username: Retrieve a specific user by username
    GET /users/:username/followers: Retrieve a list of followers for a specific user
    GET /users/:username/following: Retrieve a list of users a specific user is following
    POST /users/:username/follow: Follow a specific user
    DELETE /users/:username/follow: Unfollow a specific user
*/
const router = Router();

router.get("/logout", logout)
router.post("/signin", signin);
router.post("/users", signup);
router.get("/users/:username", auth, getUser);
router.get("/users/:username/followers", getFollowers);
router.get("/users/:username/following", getFollowing);
router.post("/users/:username/follow", auth, follow);
router.delete("/users/:username/unfollow", auth, unfollow);


export default router;