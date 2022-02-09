import "./closeFriend.css";

export default function CloseFriend({ friend }) {
  const PF = process.env.REACT_APP_ASSETS;
  return (
    <li className="sidebarClosFriend">
      <img
        src={`${PF}${friend.profilePicture}`}
        alt="a close friend"
        className="sidebarClosFriendImg"
      />
      <span className="sidebarClosFriendName">{friend.username}</span>
    </li>
  );
}
