import "./messenger.css";
import Topbar from "../topbar/Topbar";
import MessengerConversation from "../messengerConversation/MessengerConversation";
import Conversation from "../conversation/Conversation";

import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function Messenger() {
  const { user } = useContext(AuthContext);

  const [conversations, SetConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const fetchConversations = async () => {
        const res = await axios.get("/api/conversation/" + user._id);
        SetConversations(res.data);
      };
      fetchConversations();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      try {
        const fetchMessages = async () => {
          const result = await axios.get("/api/message/" + currentChat._id);
          setMessages(result.data);
        };
        fetchMessages();
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentChat]);

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
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <MessengerConversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        <div className="messengerBox">
          {currentChat ? (
            <div className="messengerBoxWrapper">
              <div className="boxTop">
                {messages.map((message) => (
                  <Conversation
                    key={message._id}
                    message={message}
                    owen={message.sender === user._id}
                  />
                ))}
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
          ) : (
            <div className="openChatToStartConversation">
              Open a conversation to start a chat !!!
            </div>
          )}
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
