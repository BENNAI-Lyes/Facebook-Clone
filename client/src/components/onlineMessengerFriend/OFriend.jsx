import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./oFriend.css";

export default function OFriend({
  onlineFriends,
  currentUserId,
  setCurrentChat,
}) {
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

  return (
    <div>
      <div className="onlineFriend">
        <div className="onlineFriendLeft">
          <img
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="onlineFriendImg"
          />
          <div className="onlineFriendBadge" />
        </div>
        <div className="onlineFriendRight">La la</div>
      </div>
    </div>
  );
}
