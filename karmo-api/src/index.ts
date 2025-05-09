import ENV from "@src/common/constants/ENV";
import server from "./server";
import AppLoggerService from "./common/services/app-logger.service";
const appLogo = require("asciiart-logo");

/* Logo and app info */
console.log(
  appLogo({
    name: "Karmo Tech Test",
    font: "Slant",
    padding: 1,
    margin: 3,
    borderColor: "grey",
    logoColor: "bold-green",
  })
    .right("Backend API v1.0")
    .emptyLine()
    .right("Environment : " + ENV.node_env)
    .right("PORT: " + ENV.port)
    .right("Timezone: " + ENV.timeZone)
    .render()
);

/* Run */
server()
  .then((app) => {
    app.listen(ENV.port, () => {
      AppLoggerService.info("Application started!");
    });
  })
  .catch((error) => {
    AppLoggerService.error("Application could not start", error);
  });
