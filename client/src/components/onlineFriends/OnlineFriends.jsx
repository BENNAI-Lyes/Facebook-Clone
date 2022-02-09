import "./onlineFriends.css";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import { Users } from "../../dummyData.js";
export default function OnlineFriends() {
  return (
    <div className="onlineFriendsContainer">
      <h3 className="onlineFriendTitle">Online friend</h3>
      {Users.map((friend) => (
        <OnlineFriend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
