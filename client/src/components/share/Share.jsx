import {
  Cancel,
  Folder,
  LocationOn,
  TagFaces,
  TagFacesRounded,
} from "@material-ui/icons";
import { useContext, useState, useRef } from "react";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_ASSETS;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shareContainer">
      <div className="shareTop">
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "/person/noavatar.webp"
          }
          alt="profile"
          className="shareProfileImg"
        />
        <input
          type="text"
          className="shareInput"
          placeholder={`What's in your mind ${user.username} ?`}
          ref={desc}
        />
      </div>
      {file && (
        <div className="sharedImgContainer">
          <img
            src={URL.createObjectURL(file)}
            alt="shared file"
            className="sharedImg"
          />
          <Cancel className="cancelShare" onClick={() => setFile(null)} />
        </div>
      )}
      <hr className="shareHr" />
      <form className="shareBottom" onSubmit={handelSubmit}>
        <ul className="shareOptions">
          <label className="shareOption" htmlFor="file">
            <Folder className="shareIcon" htmlColor="tomato" />
            <span className="shareText">Photo or Video</span>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              accept=".png,.jpeg,jpg"
            />
          </label>
          <li className="shareOption">
            <TagFacesRounded className="shareIcon" htmlColor="blue" />
            <span className="shareText">Tag</span>
          </li>
          <li className="shareOption">
            <LocationOn className="shareIcon" htmlColor="green" />
            <span className="shareText">Location</span>
          </li>
          <li className="shareOption">
            <TagFaces className="shareIcon" htmlColor="#FFD700" />
            <span className="shareText">Feelings</span>
          </li>
        </ul>
        <button className="shareButton" type="submit">
          Share
        </button>
      </form>
    </div>
  );
}
