const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const consoleMessage = require("./utils/console.util");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => consoleMessage.successMessage("Connected to MongoDB."))
  .catch((error) => consoleMessage.errorMessage(error.message));

app.listen(port, () => {
  consoleMessage.warningMessage(`Server is running on port ${port}.`);
});
