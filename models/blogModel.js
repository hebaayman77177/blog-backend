const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
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

const Blog = mongoose.model("Blog", modelSchema);
module.exports = Blog;
