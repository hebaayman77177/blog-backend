const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(blogController.getBlogs).post(blogController.addBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.editBlog)
  .delete(blogController.deleteBlog);
module.exports = router;
