const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const auth_routes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//DB CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", auth_routes);

//PORT LISTENING
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
 console.log( `Server running on port ${PORT}`);
});
