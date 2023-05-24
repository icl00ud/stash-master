const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));
router.use(express.static(path.join(__dirname, "../../components/modal")));

router.get("/panel", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/panel")));
  res.sendFile(path.join(__dirname, "../../pages/panel/panel.html"));
});

module.exports = router;
