const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB SUCCESS"));

const port = process.env.PORT || 5050;

const server = app.listen(port, () => {
  console.log("Listening on port 3000");
});
