const router = require("express").Router();
const Auth = require("../middleware/Auth");
const upload = require("../middleware/multer");

const Controller = require('../controllers/PostController')

router.post("/createPost", upload.single("image"), Controller.CreatePost);

router.get("/queryPost", Controller.QueryPost);

router.get("/:id", Controller.FindPostByID);

router.put("/:id", upload.single("image"), Controller.UpdatePostByID);

router.delete("/deletePost", Controller.DeletePostByID);

// router.delete("/", Auth, Controller.DeleteAllPost);

router.get("/public", Auth, Controller.FindAllPublic)

module.exports = router;
