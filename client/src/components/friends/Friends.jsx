import axios from "axios";
import { useEffect, useState } from "react";
import Friend from "../friend/Friend";
import "./friends.css";

export default function Friends({ user }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const result = await axios.get("/api/users/friends/" + user._id);
        setFriends(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  return (
    <>
      <h3 className="friendsTitle">User Friends</h3>
      <div className="friendsContainer">
        {friends.map((friend) => (
          <Friend key={friend._id} friend={friend} />
        ))}
      </div>
    </>
  );
}
