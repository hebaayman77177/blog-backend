const funFactory = require("./controllerFunctionsFactory");
const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const { fullUrl } = require("../utils/utilFuncions");
const catchAsync = require("../utils/catchAsync");

exports.uploadImg = (req, res, next) => {
  const fileName = `${fullUrl(req)}/uploads/${req.file.filename}`;
  return res.status(201).json({
    status: "succeed",
    data: { imgPath: fileName },
  });
};

exports.blogOwner = catchAsync(async (req, res, next) => {
  const slug = req.query.slug;
  const _id = req.params.id;
  const searchObj = slug ? { slug } : { _id };
  const blog = await Blog.findOne(searchObj);
  if (!blog) {
    return next(new AppError("Resource not found", 404));
  }
  if (blog.creator.id.toString() !== req.currentUser._id.toString()) {
    return next(new AppError("Not allowed to do this action", 403));
  }
  next();
});
exports.getBlogs = (req, res, next) => {
  let filter = {};
  return funFactory.getDocsFactory(Blog, filter)(req, res, next);
};
exports.addBlog = catchAsync(async (req, res, next) => {
  req.body.creator = {
    id: req.currentUser._id,
    name: req.currentUser.name,
  };
  const doc = await Blog.create(req.body);
  return res.status(201).json({
    status: "succeed",
    legnth: doc.legnth,
    data: doc, //the created data
  });
});

exports.getBlog = funFactory.getDocFactory(Blog);
exports.editBlog = funFactory.editDocFactory(Blog);
exports.deleteBlog = funFactory.deleteDocFactory(Blog);
