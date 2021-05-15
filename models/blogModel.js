const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const slug = require("slug");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the tite is required"],
      trim: true,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "the body is required"],
    },
    creator: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: { type: String },
      photo: { type: String },
    },
    timetoread: {
      type: Number,
      default: 5,
    },
    numInteractions: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
modelSchema.pre("save", function (next) {
  this.slug = slug(this.title) + "_" + this._id;
  next();
});
const Blog = mongoose.model("Blog", modelSchema);
module.exports = Blog;
