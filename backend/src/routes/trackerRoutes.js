const express = require("express");

const {
  getMyProgress,
  updateProgress,
} = require("../controllers/trackerController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyProgress);

router.patch(
  "/:questionId",
  protect,
  updateProgress
);

module.exports = router;