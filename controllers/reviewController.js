const { genarateToken } = require("../config/jwtToken.js");
const { genarateRefreshToken } = require("../config/refreshToken.js");
const reviewModel = require("../models/reviewModel.js");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
require("dotenv").config();
const review = async (req, res) => {
  try {
    const { rating, comment, userId, tourId } = req.body;
    const newReview = await reviewModel.create({
      rating,
      comment,
      userId,
      tourId,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra" });
    console.log(error);
  }
};

// GET: Lấy tất cả các bình luận
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({})
      .populate("userId", "displayName photoURL") // Lấy thông tin user
      .populate({
        path: "replies",
        populate: {
          path: "userId",
          select: "displayName photoURL", // Lấy thông tin user trong các phản hồi
        },
      })
      .populate("tourId", "slug"); // Lấy thông tin về tour liên quan

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy bình luận", error });
  }
};

module.exports = {
  review,
  getAllReviews,
};
