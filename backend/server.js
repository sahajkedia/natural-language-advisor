const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY!");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
