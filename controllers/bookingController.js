const bookingModel = require("../models/bookingModel");
const discountCodeModel = require("../models/discountCodeModel");
const tourModel = require("../models/tourModel");
const addBooking = async (req, res) => {
  // const { _id } = req.user;
  const { passengers, tourId, tourDetail, discount } = req.body;
  try {
    const tour = await tourModel.findById(tourId);
    const slotsNeeded =
      passengers.slotBaby + passengers.slotChildren + passengers.slotAdult;

    const tourDetails = tour.inforTourDetail.id(tourDetail[0]._id);
    if (tourDetails.slot < slotsNeeded) {
      return res.status(400).json({ message: "Not enough slots available" });
    }
    const newBooking = await bookingModel.create({
      ...req.body,
      // updateBy: _id,
    });

    tourDetails.slot -= slotsNeeded;

    const updateDiscount = await discountCodeModel.findOne({ code: discount });
    if (updateDiscount) {
      updateDiscount.quantity -= 1;
      await updateDiscount.save();
    } else {
      console.log("Không tìm thấy mã giảm giá");
    }

    await tour.save();

    res.status(201).send({
      newBooking: newBooking,
      success: true,
      message: "Đặt tour thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Create new booking failed",
      success: false,
      error: error,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.status(201).send({
      bookings,
      success: true,
      message: "get all successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "get all False",
      success: false,
      error: error,
    });
  }
};
const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  try {
    const updatedBooking = await bookingModel.findOneAndUpdate(
      { bookingId },
      { status },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
      message: "Status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

const updateBookingedDetail = async (req, res) => {
  const { fullName, phone, email, address, selectedPayment, messageContent } =
    req.body;

  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update fields
    booking.fullName = fullName || booking.fullName;
    booking.phone = phone || booking.phone;
    booking.email = email || booking.email;
    booking.address = address || booking.address;
    booking.selectedPayment = selectedPayment || booking.selectedPayment;
    booking.messageContent = messageContent || booking.messageContent;

    // Save changes
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating booking", error });
  }
};

const cancelTour = async (req, res) => {
  const { id } = req.params;

  try {
    // Lấy thông tin booking trước khi xóa
    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking không tồn tại." });
    }

    const { passengers, tourId, tourDetail } = booking;
    const slotsToRestore =
      passengers.slotBaby + passengers.slotChildren + passengers.slotAdult;

    // Tìm tour theo tourId
    const tour = await tourModel.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour không tồn tại." });
    }

    // Tìm tourDetails dựa trên tourDetail[0]._id
    if (booking.status === "Chờ xác nhận") {
      const tourDetails = tour.inforTourDetail.id(tourDetail[0]._id);
      if (!tourDetails) {
        return res.status(404).json({ message: "TourDetail không tồn tại." });
      }
      // Khôi phục lại số slot
      tourDetails.slot = +tourDetails.slot + slotsToRestore;

      await tour.save();
    }

    // Xóa booking
    await bookingModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Hủy và xóa tour thành công." });
  } catch (error) {
    console.error("Lỗi khi hủy tour:", error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
  }
};

const updateBookingedStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await bookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update status based on input
    if (status === "Hủy xác nhận") {
      booking.status = "Thanh toán thành công";
    } else if (status === "Đang hoạt động") {
      booking.status = "Đang hoạt động";
    } else if (status === "Đã hoàn thành tour") {
      booking.status = "Đã hoàn thành tour";
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }

    await booking.save();
    return res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating booking", error });
  }
};

module.exports = {
  addBooking,
  getAllBookings,
  updateBookingStatus,
  updateBookingedDetail,
  cancelTour,
  updateBookingedStatus,
};
