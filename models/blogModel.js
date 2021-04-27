const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "the tite is required"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "the body is required"],
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("Blog", modelSchema);
module.exports = Blog;
