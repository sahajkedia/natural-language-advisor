const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

router
  .route("/")
  .get(videoController.getVideos)
  .post(videoController.uploadMiddleware, videoController.uploadVideo);

router
  .route("/:id")
  .get(videoController.getVideo)
  .delete(videoController.deleteVideo);

module.exports = router;
