import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middlewares
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Hello! Welcome to Tutor Sync Server. You can go to the website through this link: ",
  );
});

// routes

export default app;
