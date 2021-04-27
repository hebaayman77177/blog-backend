const funFactory = require("./controllerFunctionsFactory");
const Blog = require("../models/blogModel");

exports.getBlogs = (req, res, next) => {
  let filter = {};
  return funFactory.getDocsFactory(Blog, filter)(req, res, next);
};
exports.addBlog = funFactory.addDocFactory(Blog);
exports.getBlog = funFactory.getDocFactory(Blog);
exports.editBlog = funFactory.editDocFactory(Blog);
exports.deleteBlog = funFactory.deleteDocFactory(Blog);
