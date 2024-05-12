import "./styling/write.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.user.username,
      title,
      desc,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    if (file) {
      const fileExtension = file.name.split(".").pop();
      const filename = uuidv4() + "." + fileExtension;
      const formData = new FormData();
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        newPost,
        config
      );
      window.location.replace("http://localhost:5173/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="writeImgContainer">
        {file && (
          <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt="Blog post Image"
          />
        )}
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
