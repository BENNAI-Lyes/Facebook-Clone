import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const PF = process.env.REACT_APP_ASSETS;
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <div className="topbarLogo">soso</div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="topbarSearch">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search for friend,post or video"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <Person />
            <div className="topbarIconBadge">1</div>
          </div>
          <div className="topbarIcon">
            <Chat />
            <div className="topbarIconBadge">2</div>
          </div>
          <div className="topbarIcon">
            <Notifications />
            <div className="topbarIconBadge">1</div>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noavatar.webp"
            }
            alt="profile"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
