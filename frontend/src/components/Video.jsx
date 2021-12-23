import React, { useState } from "react";
import axios from "axios";
import "./video.css";

const Video = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fileHandler = (e) => {
    e.preventDefault();
    if (e.target.files != null || e.target.files[0] != null) {
      setFile(e.target.files[0]);
    }
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    console.log("Uploading file...");
    try {
      const fd = new FormData();
      fd.append("file", file, file.name);
      const res = await axios.post("http://localhost:5000/api/v1/video/", fd);

      const data = res.data;

      console.log(data);
      setFiles(files.concat(data));
    } catch (err) {
      if (err.response.status === 400) {
        const errMsg = err.response.data;
        if (errMsg) {
          console.log(errMsg);
          alert(errMsg);
        }
      } else if (err.response.status === 500) {
        console.log("db error");
        alert("db error");
      } else {
        console.log("other error: ", err);
      }
    }
  };

  const fetchFiles = React.useCallback(async () => {
    const res = await axios.get("http://localhost:5000/api/v1/video/");
    setFiles(res.data);
  }, []);

  const removeFile = React.useCallback(
    async (file, index) => {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/video/${file._id}`
      );
      if (res.status === 200) {
        let temp = [...files];
        console.log(temp);
        temp.splice(index, 1);
        setFiles(temp);
      }
    },
    [files]
  );

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="container-lg">
      <form className="form" onSubmit={fileUploadHandler}>
        <input type="file" onChange={fileHandler} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
      </form>
      <div className="video-container">
        {files.map((file, i) => (
          <div key={file._id} className="Item">
            <video id="videoPlayer" width="650" controls muted="muted" autoplay>
              <source
                src={`http://localhost:5000/api/v1/video/${file._id}`}
                type="video/mp4"
              />
            </video>
            <div>
              <button
                className="remove-btn"
                type="primary"
                onClick={() => {
                  removeFile(file, i);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
