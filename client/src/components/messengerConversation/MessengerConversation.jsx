import axios from "axios";
import { useState, useEffect } from "react";
import "./messengerConversation.css";

export default function MessengerConversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_ASSETS;
  const [user, SetUser] = useState({});

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await axios.get(
          `/api/users?userId=${conversation.members.find(
            (id) => id !== currentUser._id
          )}`
        );
        SetUser(res.data);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [conversation, currentUser]);
  return (
    <div className="messengerFriend">
      <img
        src={
          user.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noavatar.webp"
        }
        alt=""
        className="messengerFriendImg"
      />
      <span className="messengerFriendName">{user.username} </span>
    </div>
  );
}
