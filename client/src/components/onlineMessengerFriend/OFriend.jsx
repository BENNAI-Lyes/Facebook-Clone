import axios from "axios";
import { useEffect, useState } from "react";
import "./oFriend.css";

export default function OFriend({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const PF = process.env.REACT_APP_ASSETS;
  const [followings, setFollowings] = useState([]);
  const [onlineFollowings, setOnlineFollowings] = useState([]);

  useEffect(() => {
    try {
      const fetchFollowings = async () => {
        const res = await axios.get("/api/users/friends/" + currentUserId);
        setFollowings(res.data);
      };
      fetchFollowings();
    } catch (error) {
      console.log(error);
    }
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFollowings(followings.filter((f) => onlineUsers.includes(f._id)));
  }, [followings, onlineUsers]);

  const handelClick = async (user) => {
    try {
      const res = await axios.get(
        `/api/conversation/find/${user._id}/${currentUserId}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {onlineFollowings.map((o) => (
        <div
          className="onlineFriend"
          key={o._id}
          onClick={() => handelClick(o)}
        >
          <div className="onlineFriendLeft">
            <img
              src={
                o.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noavatar.webp"
              }
              alt=""
              className="onlineFriendImg"
            />
            <div className="onlineFriendBadge" />
          </div>
          <div className="onlineFriendRight">{o.username}</div>
        </div>
      ))}
    </div>
  );
}
