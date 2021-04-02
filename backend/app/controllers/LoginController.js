const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.RegisterUser =  async (req, res) => {
    try {
        let { email, password, passwordC, name, contactNumber } = req.body;
        if ( !email || !password || !passwordC || !name || !contactNumber )
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordC)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            name,
            isAdmin: false,
            contactNumber
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.RegisterAdmin =  async (req, res) => {
    try {
        let { email, password, passwordC, name, contactNumber } = req.body;
        if ( !email || !password || !passwordC || !name || !contactNumber )
            return res.status(400).json({ msg: "Enter all fields please." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordC)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            name,
            isAdmin: true,
            contactNumber
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = await User.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                isAdmin: user.isAdmin
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.ValidateToken = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.SECRET);
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.GetDetails = async (req, res) => {
    const user = await User.findById(req.user);
    console.log(user)
    res.json({
        name: user.name,
        id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
        contactNumber: user.contactNumber,
        followingList: user.followingList,
        followerList: user.followerList,
        blockList: user.blockList,
        bio: user.bio
    });
}
