import "./conversation.css";

export default function Conversation({ owen }) {
  return (
    <div className={owen ? "conversation owen" : "conversation"}>
      <div className="conversationTop">
        <img
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="conversationImg"
        />
        <p className="conversationText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        </p>
      </div>
      <div className="conversationBottom">1 hour ago</div>
    </div>
  );
}
