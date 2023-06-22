const ProductController = require("../Controllers/ProductController");
// const RatingController = require("../Controllers/RatingController");
const express = require("express");
let router = express.Router();

//#region Product
router.get("/", ProductController.GetAllProducts);
router.post("/", ProductController.addNewProduct);
router.get("/:id", ProductController.GetProductByID);
router.get("/search/:key", ProductController.SearchMeal);
//#endregion

module.exports = router;
