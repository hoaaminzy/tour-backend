const inforTourModel = require("../models/inforTourModel");
const asyncHandle = require("express-async-handler");

// create user
const addInforTour = async (req, res) => {
  // const { _id } = req.user;
  try {
    const newInforTour = await inforTourModel.create({
      ...req.body,
      // updateBy: _id,
    });

    res.status(201).send({
      newInforTour: newInforTour,
      success: true,
      message: "Create new product successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Create new product failed",
      success: false,
      error: error,
    });
  }
};

const getAllInforTours = async (req, res) => {
  try {
    const inforTours = await inforTourModel.find({});
    res.status(201).send({
      inforTours,
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

// // get a user
// const getsignProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const getProduct = await productModel.findById(id).populate("updateBy");
//     res.status(200).json({
//       success: true,
//       message: "Get user successfully !",
//       getProduct,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Get user error !",
//     });
//   }
// };

// update user
// const updateProduct = asyncHandle(async (req, res) => {
// const { _id } = req.params;
// try {
//   // Hash lại mật khẩu mới nếu có
//   if (req.body.password) {
//     const salt =
//       await bcrypt.genSaltSync(10);
//     req.body.password =
//       await bcrypt.hash(
//         req.body.password,
//         salt
//       );
//   }
//   const user =
//     await productModel.findByIdAndUpdate(
//       _id,
//       {
//         name: req?.body?.name,
//         email: req?.body?.email,
//         mobile: req?.body?.mobile,
//         password:
//           req?.body?.password,
//         role: req?.body?.role,
//       },
//       {
//         new: true,
//       }
//     );
//   res.json(user);
// } catch (error) {
//   console.log(error);
//   res.status(500).send({
//     success: false,
//     message: "Update user error !",
//   });
// }
// });

// delete a user
// const deletesignProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await productModel.findByIdAndDelete(id);
//     res.status(200).json({
//       success: true,
//       message: "delete product successfully !",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "delete product error !",
//     });
//   }
// };
// const filterProduct = async (req, res) => {
//   const filters = req.body;
//   const filterQuery = {};
//   if (filters.city) filterQuery.city = filters.city;
//   if (filters.action) filterQuery.action = filters.action;
//   if (filters.type) filterQuery.type = filters.type;
//   console.log(filterQuery.price);
//   if (filters.price) {
//     switch (filters.price) {
//       case "1":
//         filterQuery.price = {
//           $lt: 500000,
//         };
//         break;
//       case "2":
//         filterQuery.price = {
//           $gte: 500000,
//           $lte: 1000000,
//         };
//         break;
//       case "3":
//         filterQuery.price = {
//           $gte: 1000000,
//           $lte: 2000000,
//         };
//         break;
//       case "4":
//         filterQuery.price = {
//           $gte: 2000000,
//           $lte: 3000000,
//         };
//         break;
//       case "5":
//         filterQuery.price = {
//           $gt: 3000000,
//         };
//         break;
//     }
//   }

//   try {
//     const products = await productModel.find(filterQuery);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// const updateSp = async (req, res) => {
//   try {
//     const { _id, status } = req.body;

//     // Kiểm tra dữ liệu đầu vào
//     if (!_id || typeof status === "undefined") {
//       return res.status(400).json({
//         message: "Thiếu dữ liệu yêu cầu",
//       });
//     }

//     const product = await productModel.findById(_id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Không thấy id sản phẩm này",
//       });
//     }

//     product.statusProduct = status;

//     await product.save();

//     res.status(200).json({
//       message: "Cập nhật sản phẩm thành công",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Cập nhật sản phẩm thất bại",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  addInforTour,
  getAllInforTours,
  // updateSp,
  // getsignProduct,
  // deletesignProduct,
  // updateProduct,
  // getAllProduct,
  // filterProduct,
};
