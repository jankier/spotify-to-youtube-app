const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      succes: true,
      message: "succesful",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    succes: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

router.get(
  "/youtube",
  passport.authenticate("youtube", {
    scope: ["https://www.googleapis.com/auth/youtube"],
  }),
  function (req, res) {}
);

router.get(
  "/youtube/callback",
  passport.authenticate("youtube", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/YoutubeLoginPage",
  })
);

module.exports = router;
