const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoDB = require("./db");
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
mongoDB();
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log("Listening on port 5000");
});
