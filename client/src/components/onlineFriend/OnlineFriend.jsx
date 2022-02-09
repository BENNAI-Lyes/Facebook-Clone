import "./onlineFriend.css";

export default function OnlineFriend({ friend }) {
  const PF = process.env.REACT_APP_ASSETS;
  return (
    <div className="onlineFriendContainer">
      <div className="onlineFriendImgContainer">
        <img
          src={PF + friend.profilePicture}
          alt="friend"
          className="onlineFriendImg"
        />
        <span className="onlineFriendBadge" />
      </div>
      <span className="onlineFriendName">{friend.username}</span>
    </div>
  );
}
