const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const storage = require("../utils/gfs-storage");

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "media",
  });
});

const store = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /mp4|mov|/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
};

exports.uploadMiddleware = (req, res, next) => {
  const upload = store.single("file");
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      // check if our filetype error occurred
      if (err === "filetype") return res.status(400).send("Video files only");
      // An unknown error occurred when uploading.

      return res.sendStatus(500);
    }
    // all good, proceed
    next();
  });
};

exports.getVideos = async (req, res) => {
  try {
    const files = await gfs.find().toArray();
    res.json(files);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("deleting file: ", id);
    if (!id || id === "undefined") return res.status(400).send("no video id");
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
      if (err) return res.status(500).send("video deletion error");
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    // if no id return error
    if (!id || id === "undefined") return res.status(400).send("No video id");
    // if there is an id string, cast it to mongoose's objectId type
    const _id = new mongoose.Types.ObjectId(id);
    // search for the file by id
    gfs.find({ _id }).toArray((err, files) => {
      if (!files || files.length === 0)
        return res.status(400).send("no files exist");

      // if a file exists, stream the file to the client
      gfs.openDownloadStream(_id).pipe(res);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    let { file } = req;
    //replace id with _id in the response
    file = JSON.parse(JSON.stringify(file).split('"id":').join('"_id":'));
    console.log("Uploaded file: ", file);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
  }
};
