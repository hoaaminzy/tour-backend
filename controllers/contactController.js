const contactModel = require("../models/contactModel");

const contact = async (req, res) => {
  try {
    const {
      infoType,
      fullName,
      email,
      phone,
      companyName,
      numberOfGuests,
      address,
      title,
      content,
    } = req.body;

    //   // Kiểm tra nếu người dùng không tích vào checkbox "Tôi không phải là người máy"
    //   if (!isHuman) {
    //     return res.status(400).json({ success: false, message: 'Vui lòng xác nhận bạn không phải là người máy' });
    //   }

    const newContact = new contactModel({
      infoType,
      fullName,
      email,
      phone,
      companyName,
      numberOfGuests,
      address,
      title,
      content,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Thông tin liên hệ đã được gửi thành công",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống, không thể gửi thông tin liên hệ",
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    const allContact = await contactModel.find();
    res.status(200).json({
      success: true,
      message: "tất cả liên hệ",
      data: allContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống, không thể gửi thông tin liên hệ",
    });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  const { contacted } = req.body; // Lấy trạng thái từ body

  try {
    // Tìm liên hệ theo ID
    const updateCt = await contactModel.findById(id);

    if (!updateCt) {
      return res.status(404).json({ error: "Contact not found" }); // Phản hồi khi không tìm thấy
    }

    // Lật trạng thái contacted
    updateCt.contacted = contacted;

    // Lưu thay đổi
    await updateCt.save();

    // Phản hồi thành công
    return res.status(200).json({
      message: "Contact updated successfully",
      data: updateCt,
    });
  } catch (error) {
    console.error("Error updating contact:", error);

    // Phản hồi lỗi server
    return res.status(500).json({ error: "Failed to update contact" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const delContact = await contactModel.findByIdAndDelete(id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = {
  contact,
  getAllContact,
  deleteContact,
  updateContact,
};
