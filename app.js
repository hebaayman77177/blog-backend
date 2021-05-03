const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const globalErorrHandler = require("./controllers/globalErorrHandler");
const AppError = require("./utils/appError");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");

require("dotenv").config();
// routers
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();
// middlewares
//enable cors
app.use(cors());
//set security http headers
app.use(helmet());
//to see requsts in the termenal
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// limit the number of requests of an ip
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "too meny requests for this ip,please try one hour later"
// });
// // app.use("/api", limiter);
//not to add code in mongo query
app.use(mongoSanitize());
//not to add html
app.use(xss());
//to prevent query parameter pollution
app.use(hpp());
//parse the body of the request and add it in req.body
app.use(express.json({ limit: "10kb" }));
//response to static file requsts
app.use(express.static(`${__dirname}/public`));

app.use(passport.initialize());
// mount routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/blogs", blogRouter);
//to handle unhandled urls it sends an 404 error

app.all("*", (req, res, next) => {
  const err = new AppError(
    `the requested url ${req.originalUrl} not found in this server`,
    404
  );
  next(err);
});

//middle ware to catch async errors that uncought untill here all the app and beyoud
app.use(globalErorrHandler);
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });
module.exports = app;
