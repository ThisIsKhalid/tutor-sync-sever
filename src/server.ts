import { Server } from "http";
import app from "./app";

let server: Server;

async function main() {
  try {
    // db connection

    server = app.listen(5000, () => {
      console.log(`app is running on port 5000`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(`😈 uncaughtException is detected , shutting down ...`, err);
  process.exit(1);
});
