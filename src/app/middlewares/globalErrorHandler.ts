import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.statusCode);

  // default error response
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // custom error response
  if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // ultimate error response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;



// class Car {}
// const myCar = new Car();
// console.log(myCar instanceof Car); // true

