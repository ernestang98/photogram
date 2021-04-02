const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 email: { type: String, required: [true,'The email field is required!'], trim: true, unique: 1 },
 password: { type: String, required: [true,'The password field is required!'], minlength: 5 },
 name: { type: String, required: [true,'The name field is required!'], trim: true, maxlength: 100 },
 contactNumber: { type: Number, required: [true,'The Contact Number field is required!'], trim: true, maxlength: 100 },
 isAdmin: { type: Boolean, trim: true, maxlength: 100 },
 followingList : {type: Array, default: []},
 followerList : {type: Array, default: []},
 blockList : {type: Array, default: []},
 bio: {type: String, default: ""}
});
module.exports = User = mongoose.model("User", userSchema);


