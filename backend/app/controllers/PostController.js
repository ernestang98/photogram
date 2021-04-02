const Post = require("../models/Post");
const User = require("../models/User")
const cloudinary = require("../middleware/Cloudinary");
const res = require("express");

exports.CreatePost =  async (req, res) => {

    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create new user
        let post = new Post({
            title: req.body.title,
            author: req.body.author,
            caption: req.body.caption,
            visibility: req.body.visibility ? req.body.visibility : "public",

            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            likes: [],
            dislikes: [],
            comments: []
        });
        // Save user
        await post.save();
        res.json(post);

    } catch (err) {
        console.log(err);
    }
};

exports.QueryPost = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Post.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
}

exports.FindPostByID = (req, res) => {
    const id = req.params.id;

    Post.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Post with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Post with id=" + id });
        });
};

exports.UpdatePostByID = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    let post = await Post.findById(req.params.id);

    const id = req.params.id;

    await cloudinary.uploader.destroy(post.cloudinary_id);

    const data = {
        title: req.body.title || post.title,
        author: req.body.author || post.author,
        caption: req.body.caption || post.caption,
        visibility: req.body.visibility || post.visibility,
    };

    if (req.file.path) {
        const result = await cloudinary.uploader.upload(req.file.path);
        data.avatar = result.secure_url || post.avatar
        data.cloudinary_id = result.public_id || post.cloudinary_id
    }

    Post.findByIdAndUpdate(id, data, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                });
            } else res.send({ message: "Post was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

exports.DeletePostByID = async (req, res) => {
    const id = req.body.id;

    const post = await Post.findById(id)

    await cloudinary.uploader.destroy(post.cloudinary_id);

    await Post.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            } else {
                res.send({
                    message: "Post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

exports.DeleteAllPost = (req, res) => {
    Post.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Posts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all posts."
            });
        });
};

exports.FindAllPublic = (req, res) => {
    Post.find({ visibility: "PUBLIC" })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};
