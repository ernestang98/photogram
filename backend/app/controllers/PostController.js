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

    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        let post = await Post.findById(req.params.id);

        const id = req.params.id;

        const data = {
            title: req.body.title || post.title,
            author: req.body.author || post.author,
            caption: req.body.caption || post.caption,
            visibility: req.body.visibility || post.visibility,
        };

        if (req.file.path) {
            await cloudinary.uploader.destroy(post.cloudinary_id);
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
    }
    catch (e) {
        console.log(e)
    }

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

exports.LikePost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId
        console.log(userId)
        console.log(postId)
        const post = await Post.findById(postId)
        if (post) {
            let likes = post.likes ? post.likes : []
            const found = likes.find(element => element === userId)
            console.log(found)
            if (found) {
                const index = likes.indexOf(userId)
                likes.splice(index, 1)
            }
            else {
                likes.push(userId)
            }
            Post.findByIdAndUpdate(postId, {
                likes: likes
            }, { useFindAndModify: false }).then(data => {
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
        }
        else {
            res.status(404).send({
                message: `Cannot update Post with id=${id}. Maybe Post was not found!`
            });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error updating Post with id=" + id
        });
    }
}

exports.CommentOnPost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const username = req.body.username;
        const userId = req.body.userId;
        const postComment =  req.body.postComment;
        const commentId = Math.random().toString(36).substring(7)
        const dateTimeNow = new Date()
        const comment = {
            username,
            userId,
            commentId,
            postComment,
            dateTimeNow
        }
        const post = await Post.findById(postId)
        if (post) {
            let comments = post.comments ? post.comments : []
            comments.push(comment)
            Post.findByIdAndUpdate(postId, {
                comments: comments
            }, { useFindAndModify: false }).then(data => {
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
        }
        else {
            res.status(404).send({
                message: `Cannot update Post with id=${id}. Maybe Post was not found!`
            });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error updating Post with id=" + id
        });
    }
}
