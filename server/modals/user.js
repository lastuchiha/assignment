import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    followers: {
        type: Array,
        default: []
    },

    following: {
        type: Array,
        default: []
    }
});

const User = mongoose.model("Users", UserSchema);
export default User;