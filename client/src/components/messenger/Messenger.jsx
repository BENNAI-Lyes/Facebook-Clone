import "./messenger.css";
import Topbar from "../topbar/Topbar";
import MessengerFriend from "./messengerFriend/MessengerFriend";
import Conversation from "../conversation/Conversation";

export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messengerMenu">
          <div className="messengerMenuWrapper">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for friends"
              className="messengerSearch"
            />
            <MessengerFriend />
            <MessengerFriend />
            <MessengerFriend />
            <MessengerFriend />
          </div>
        </div>

        <div className="messengerBox">
          <div className="messengerBoxWrapper">
            <div className="boxTop">
              <Conversation />
              <Conversation owen />
              <Conversation />
              <Conversation />
            </div>
            <div className="boxBottom">
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                className="messageTextArea"
              ></textarea>
              <button className="sendMessege">Send</button>
            </div>
          </div>
        </div>
        <div className="messengerOnlineFriends">
          <div className="messengerOnlineFriendsWrapper">
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
        </div>
      </div>
    </>
  );
}
