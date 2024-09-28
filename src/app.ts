import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

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

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<section style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
      <div style="text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333; font-family: Arial, sans-serif;">Tutor-Sync Server</h1>
        <p style="color: #666; font-family: Arial, sans-serif;">Server is running</p>
        <p style="color: #666; font-family: Arial, sans-serif;">
        Visit <a href="https://gitmoji.dev/" target='_blank' style="color: #007bff; text-decoration: none;">Tutor Sync</a> for more information. </p>
      </div>
    </section>`,
  );
});

// Error Handler
app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
