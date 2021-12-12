const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const storage = (function () {
  const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
      // this function runs every time a new file is created
      return new Promise((resolve, reject) => {
        // use the crypto package to generate some random hex bytes
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          // turn the random bytes into a string and add the file extension at the end of it (.mp4)
          // this way our file names will not collide if someone uploads the same file twice
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "media",
          };
          // resolve these properties so they will be added to the new file document
          resolve(fileInfo);
        });
      });
    },
  });

  return storage;
})();

module.exports = storage;
