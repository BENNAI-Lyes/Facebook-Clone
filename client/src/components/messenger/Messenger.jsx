import "./messenger.css";
import Topbar from "../topbar/Topbar";
import MessengerConversation from "../messengerConversation/MessengerConversation";
import Conversation from "../conversation/Conversation";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import OFriend from "../onlineMessengerFriend/OFriend";

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current?.emit("addUser", user._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineFriends(users.map((u) => u.userId));
    });
  }, [user]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    try {
      const fetchConversations = async () => {
        const res = await axios.get("/api/conversation/" + user._id);
        setConversations(res.data);
      };
      fetchConversations();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    try {
      const fetchMessages = async () => {
        const result = await axios.get("/api/message/" + currentChat?._id);
        setMessages(result.data);
      };
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const newChatMessage = {
        sender: user._id,
        conversationId: currentChat._id,
        text: newMessage,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });

      const result = await axios.post("/api/message", newChatMessage);

      setMessages([...messages, result.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
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
                  <div key={message._id} ref={scrollRef}>
                    <Conversation
                      message={message}
                      owen={message.sender === user._id}
                    />
                  </div>
                ))}
              </div>
              <form className="boxBottom" onSubmit={handelSubmit}>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  className="messageTextArea"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button className="sendMessege" type="submit">
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="openChatToStartConversation">
              Open a conversation to start a chat !!!
            </div>
          )}
        </div>
        <div className="messengerOnlineFriends">
          <div className="messengerOnlineFriendsWrapper">
            <OFriend
              onlineUsers={onlineFriends}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
