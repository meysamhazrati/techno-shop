import dotenv from "dotenv";
import { connect } from "mongoose";

import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connect(process.env.MONGO_URI, { ignoreUndefined: true });
    console.log("Database connected.");
  } catch (error) {
    console.error(error);
  }
})();

app.listen(port, () => console.log(`The server is running on port ${port}.`));