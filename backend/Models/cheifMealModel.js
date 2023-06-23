const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let DB_URL = process.env.MONGO_URI;

if (mongoose.connect(DB_URL, { useNewUrlParser: true })) {
  console.log("Connected to database");
}
const chefMealsSchema = new mongoose.Schema({
    chefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    mealIds: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'meals'
    }
  });
  
  module.exports = mongoose.model('Chefmeals', chefMealsSchema);
