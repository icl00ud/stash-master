const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));
router.use(express.static(path.join(__dirname, "../../components/modal/create-product.js")));

router.get("/stock/create_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/create-product.html"));
});

router.get("/stock/update_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/update-product.html"));
});

router.get("/stock/delete_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/delete-product.html"));
});

module.exports = router;