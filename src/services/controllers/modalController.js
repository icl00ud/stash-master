const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));

router.get("/stockPage/create_movement", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/movement/create-movement/create-movement.html"));
});

router.get("/stockPage/create_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/product/create-product/create-product.html"));
});

router.get("/stockPage/update_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/product/update-product/update-product.html"));
});

router.get("/stockPage/delete_product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../components/modal/product/delete-product/delete-product.html"));
});

module.exports = router;