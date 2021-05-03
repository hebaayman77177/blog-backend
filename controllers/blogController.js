const funFactory = require("./controllerFunctionsFactory");
const Blog = require("../models/blogModel");
const { fullUrl } = require("../utils/utilFuncions");

exports.uploadImg = (req, res, next) => {
  const fileName = `${fullUrl(req)}/uploads/${req.file.filename}`;
  return res.status(201).json({
    status: "succeed",
    data: { imgPath: fileName },
  });
};

exports.getBlogs = (req, res, next) => {
  let filter = {};
  return funFactory.getDocsFactory(Blog, filter)(req, res, next);
};
exports.addBlog = funFactory.addDocFactory(Blog);
exports.getBlog = funFactory.getDocFactory(Blog);
exports.editBlog = funFactory.editDocFactory(Blog);
exports.deleteBlog = funFactory.deleteDocFactory(Blog);
