const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

const username = "jawes";
const password = "RnXuTxp0ERdDlivT";
const cluster = "cluster0.unxvrcj";
const dbname = "Recipes";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);



app.listen(3001, () => {
  console.log("Server is running at port 3001");
});