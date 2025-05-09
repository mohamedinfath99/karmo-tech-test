import { Request } from "express";

/**
 * @interface ApiRequest
 * @description Application api request format
 */

export interface ApiRequest<T = void> extends Request {
  body: T;
}
