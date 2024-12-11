// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import 'dotenv/config';



// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import configMiddleware from "./config";
configMiddleware(app);

// 👇 Start handling routes here
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

// Add artwork routes
import artRoutes from "./routes/artwork.routes";
app.use("/api", artRoutes); 

// Add artist routes
import artistRoutes from "./routes/artist.routes";
app.use("/api", artistRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "../src/error-handling/index";
errorHandling(app);

export default app;
