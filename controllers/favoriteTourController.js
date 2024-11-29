const FavoriteTour = require("../models/favoriteTourModel");

// Add a tour to favorites
const addFavoriteTour = async (req, res) => {
  const { userId, tourId } = req.body;

  try {
    // Check if the tour is already in the user's favorites
    const existingFavorite = await FavoriteTour.findOne({ userId, tourId });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Tour đã có trong danh sách yêu thích." });
    }

    // Add the tour to favorites
    const newFavorite = new FavoriteTour({ userId, tourId });
    await newFavorite.save();

    res.status(200).json({
      message: "Đã thêm tour vào danh sách yêu thích.",
      favorite: newFavorite,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại sau.", error });
  }
};

// Remove a tour from favorites
const removeFavoriteTour = async (req, res) => {
  const { userId, tourId } = req.body;

  try {
    // Remove the tour from favorites
    const favorite = await FavoriteTour.findOneAndDelete({ userId, tourId });

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Tour không có trong danh sách yêu thích." });
    }

    res
      .status(200)
      .json({ message: "Đã xóa tour khỏi danh sách yêu thích.", favorite });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại sau.", error });
  }
};

const getFavoriteTours = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await FavoriteTour.find({ userId });
    res.status(200).json({ message: "Danh sách tour yêu thích", favorites });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại sau.", error });
  }
};

module.exports = {
  addFavoriteTour,
  removeFavoriteTour,
  getFavoriteTours,
};
