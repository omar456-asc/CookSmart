let productsModel = require("../Models/ProductsModel");
const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


var SearchMeal = async (req, res) => {
  try {
    let meals = await productsModel.find({
      $or: [
        { title: { $regex: new RegExp(req.params.key), $options: "i" } },
        { category: { $regex: new RegExp(req.params.key), $options: "i" } },
      ],
    });
    res.send(meals);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

var GetAllProducts = async (req, res) => {
  try {
    var AllProducts = await productsModel.aggregate([
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredients",
          foreignField: "id",
          as: "ingredients_details",
        },
      },
    ]);

    await res.status(200).json(AllProducts);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get all Products");
  }
};

var GetProductByID = async (req, res) => {
  try {
    var ID = req.params.id;

    var product = await productsModel.aggregate([
      {
        $match: { _id: new ObjectId(ID) },
        // $match: { id: ID },
      },
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredients",
          foreignField: "_id",
          as: "ingredients_details",
        },
      },
      {
        $unwind: {
          path: "$ingredients_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { productID: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$productID", "$$productID"] },
                    { $ne: ["$value", null] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                rating: { $avg: "$value" },
              },
            },
            {
              $project: {
                _id: 0,
                rating: { $round: ["$rating", 1] },
              },
            },
          ],
          as: "rating",
        },
      },

      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          image: { $first: "$image" },
          summary: { $first: "$summary" },
          ingredients: { $addToSet: "$ingredients_details._id" },
          category: { $first: "$category" },
          price: { $sum: "$ingredients_details.price" },
          rate: { $first: "$rating.rating" },
          ingredients_details: {
            $push: {
              _id: "$ingredients_details._id",
              name: "$ingredients_details.name",
              consistency: "$ingredients_details.consistency",
              image: "$ingredients_details.image",
              amount: "$ingredients_details.amount",
              price: "$ingredients_details.price",
            },
          },
        },
      },
    ]);
    console.log(product);
    product.ingredientLength = product[0].ingredients.length;
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get Product");
  }
};
var DeleteProductByID = async (req, res) => {
  try {
    var ID = req.params.id;
    await productsModel.findByIdAndDelete(ID);
    res.send("Deleted Successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to delete user");
  }
};
module.exports = {
    GetAllProducts,
    GetProductByID,
    SearchMeal,
    DeleteProductByID
}