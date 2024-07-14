const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
// eslint-disable-next-line no-unused-vars
const passportSetup = require("./passport.js");
const authRout = require("./routes/auth.js");
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["spotify-to-youtube"],
    maxAge: 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use("/auth", authRout);

app.listen("5000", () => {
  console.log("Server is running");
});
