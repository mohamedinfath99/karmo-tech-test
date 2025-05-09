import logger from "jet-logger";

/**
 * @class <Static> AppLoggerService
 * @description Service for managing application logs
 */

export default class AppLoggerService {
  /**
   * @function info
   * @description Information level log
   * @param message Log message
   */
  static info(message: string) {
    logger.info(message);
  }

  /**
   * @function error
   * @description Error level log
   * @param message Log message
   * @param error Error Exception
   */
  static error(message: string, error?: Error) {
    logger.err(
      {
        ...{ message },
        error,
      },
      true
    );
  }
}
