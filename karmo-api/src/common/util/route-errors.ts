import HttpStatusCodes from "../constants/HttpStatusCodes";

/**
 * @class RouteError
 * @description Common route error handler
 */
export class RouteError extends Error {
  public isOperational: boolean;
  public statusCode: HttpStatusCodes;
  public status: string;

  public constructor(statusCode: HttpStatusCodes, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Captures the stack trace for easier debugging
    Error.captureStackTrace(this, this.constructor);
  }
}
