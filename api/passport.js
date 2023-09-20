const YoutubeV3Strategy = require('passport-youtube-v3').Strategy
const passport = require("passport");

const REACT_APP_YOUTUBE_CLIENT_ID = "301368527444-abftn0ki244c1shudimvbammamdki612.apps.googleusercontent.com";
const REACT_APP_YOUTUBE_CLIENT_SECRET = "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";

passport.use(new YoutubeV3Strategy({
  clientID: REACT_APP_YOUTUBE_CLIENT_ID,
  clientSecret: REACT_APP_YOUTUBE_CLIENT_SECRET,
  callbackURL: "/auth/youtube/callback",
  scope: ['https://www.googleapis.com/auth/youtube.readonly']
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user);
})