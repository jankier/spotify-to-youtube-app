const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const passport = require("passport");
require("dotenv").config();

passport.use(
  new YoutubeV3Strategy(
    {
      clientID: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_YOUTUBE_CLIENT_SECRET,
      callbackURL: "/auth/youtube/callback",
      scope: ["https://www.googleapis.com/auth/youtube"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, [profile, accessToken]);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
