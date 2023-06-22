let productsModel = require("../Models/ProductsModel");
const productSchema = require("../Utils/ProductSchema");
const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ingredient-uploads", // Specify the folder in Cloudinary where the ingredient images will be stored
    allowedFormats: ["jpg", "jpeg", "png"], // Specify the allowed image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: Specify any image transformations you want to apply
  },
});

const upload = multer({ storage: storage }).single("image");

const addNewProduct = async (req, res) => {
  console.log(req.body)
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Error uploading image" });
      } else if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const { title, price, summary, ingredients, category } = req.body;

      let image = "";
      if (req.file) {
        image = req.file.path;
      }
      // Validate the incoming product data against the schema

      const isValid = productSchema({
        title,
        price,
        summary,
        image,
        ingredients,
        category,
      });


      // Create a new product object
      const newProduct = new productsModel({
        title,
        price,
        summary,
        image,
        ingredients,
        category,
        image,
      });

      // Save the new product object to the database
      await newProduct.save();

      return res.status(201).json({ message: "Product created successfully" });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error !!!!" });
  }
};

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
module.exports = {
    GetAllProducts,
    GetProductByID,
    SearchMeal,
    addNewProduct
}