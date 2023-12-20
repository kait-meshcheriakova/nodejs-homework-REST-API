import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log(`Database connection successful`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
// TK195qeqZKjke7IS
// const DB_HOST =
//   "mongodb+srv://Kait:TK195qeqZKjke7IS@cluster0.coojjhm.mongodb.net/my-contacts?retryWrites=true&w=majority";
