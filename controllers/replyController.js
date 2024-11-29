const reviewModel = require("../models/reviewModel.js");

const ReplyModel = require("../models/replyModel.js");

require("dotenv").config();
const addReply = async (req, res) => {
  const { reply, userId, reviewId } = req.body;

  try {
    const newReply = new ReplyModel({
      reply,
      userId,
      reviewId,
    });

    await newReply.save();

    // Cập nhật review để thêm phản hồi vào danh sách replies
    const review = await reviewModel.findById(reviewId);
    review.replies.push(newReply._id);
    await review.save();

    res
      .status(201)
      .json({ message: "Phản hồi đã được thêm thành công", reply: newReply });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm phản hồi", error });
    console.log(error);
  }
};

// GET: Lấy tất cả các bình luận

module.exports = {
  addReply,
};
