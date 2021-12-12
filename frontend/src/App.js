import React, { useState } from "react";
import axios from "axios";

const App = () => {
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
    <div className="App">
      <form className="Form" onSubmit={fileUploadHandler}>
        <input type="file" onChange={fileHandler} />
        <button type="submit">upload</button>
      </form>
      <div className="Media">
        {files.map((file, i) => (
          <div key={file._id} className="Item">
            <video id="videoPlayer" width="650" controls muted="muted" autoplay>
              <source
                src={`http://localhost:5000/api/v1/video/${file._id}`}
                type="video/mp4"
              />
            </video>
            <button
              type="button"
              onClick={() => {
                removeFile(file, i);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
