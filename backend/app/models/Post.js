const mongoose = require("mongoose");
const ShortId = require('mongoose-shortid-nodeps');

let userSchema = new mongoose.Schema({

        _id: ShortId,
        avatar: String,
        cloudinary_id: String,

        title: String,
        caption: String,
        visibility: String,

        author: String,
        authorId: String,
        likes: Array,
        dislikes: Array,
        comments: Array,

}, { timestamps: true }
);

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = Post = mongoose.model("Post", userSchema);
