import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import "./profile.css";

export default function Profile() {
  const PF = process.env.REACT_APP_ASSETS;
  const username = useParams().username;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRightbar">
          <div className="profileTop">
            <img
              src={
                user.coverPicture
                  ? PF + user.coverPicture
                  : PF + "person/nocover.jpg"
              }
              alt="cover"
              className="profileCoverImg"
            />
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noavatar.webp"
              }
              alt="profile"
              className="profileProfileImg"
            />
            <div className="profileNameAdnDesc">
              <h4 className="profileName">{user.username}</h4>
              <span className="profileDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
