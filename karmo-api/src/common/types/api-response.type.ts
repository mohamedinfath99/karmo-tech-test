import { Response } from "express";

interface Json {
  message: string;
  totalDistance?: number;
  totalData?: number;
  data?: any;
}

type Send<T = Response> = (body?: Json) => T;

/**
 * @interface ApiResponse
 * @description Application api response format. Extends original express request
 */

export interface ApiResponse extends Response {
  json: Send<this>;
}
