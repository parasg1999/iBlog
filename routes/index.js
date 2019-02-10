var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.redirect('/reading');
});

// router.get("/contact", function (req, res) {
//   res.redirect('/c');
// });

module.exports = router;