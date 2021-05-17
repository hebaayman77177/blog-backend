const express = require("express");
const path = require("path");
const blogController = require("../controllers/blogController");
const multer = require("multer");
const shortid = require("shortid");
const authController = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router({ mergeParams: true });

router
  .route("/upload-img")
  .post(
    // authController.authMiddleware,
    upload.single("image"),
    blogController.uploadImg
  );

router
  .route("/")
  .get(blogController.getBlogs)
  .post(authController.authMiddleware, blogController.addBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(
    authController.authMiddleware,
    blogController.blogOwner,
    blogController.editBlog
  )
  .delete(
    authController.authMiddleware,
    blogController.blogOwner,
    blogController.deleteBlog
  );
module.exports = router;
