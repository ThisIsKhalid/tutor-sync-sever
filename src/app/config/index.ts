import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  databaseURL: process.env.DATABASE_URL,
};
