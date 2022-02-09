import "./friend.css";
import { Link } from "react-router-dom";

export default function Friend({ friend }) {
  const PF = process.env.REACT_APP_ASSETS;
  return (
    <Link
      to={"/profile/" + friend.username}
      className="friendContainer"
      style={{ textDecoration: "none" }}
    >
      <img
        src={
          friend.profilePicture
            ? PF + friend.profilePicture
            : PF + "person/noavatar.webp"
        }
        alt="friend"
        className="friendImg"
      />
      <span className="friendName">{friend.username}</span>
    </Link>
  );
}
