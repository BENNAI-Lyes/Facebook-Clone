import "./conversation.css";
import { format } from "timeago.js";

export default function Conversation({ owen, message }) {
  return (
    <div className={owen ? "conversation owen" : "conversation"}>
      <div className="conversationTop">
        <img
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="conversationImg"
        />
        <p className="conversationText">{message.text}</p>
      </div>
      <div className="conversationBottom">{format(message.createdAt)}</div>
    </div>
  );
}
