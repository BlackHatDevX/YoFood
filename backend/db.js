const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://jashgro:703grover@cluster0.iwqcx0w.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURL);
  console.log("connected db");
  const fetched_data = mongoose.connection.db.collection("food_items");
  data = await fetched_data.find({}).toArray();
  global.food_items = data;
  const fetched_Category = mongoose.connection.db.collection("foodCategory");
  data_foodCategory = await fetched_Category.find({}).toArray();
  global.foodCategory = data_foodCategory;
  // console.log(global.foodCategory);
};

module.exports = mongoDB;
