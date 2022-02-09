import "./info.css";

export default function Info({ user }) {
  return (
    <div className="infoContainer">
      <h4 className="infoTitle">User Information</h4>
      <div className="infoItem">
        <div className="infoItemKey">City:</div>
        <div className="infoItemValue">{user.city ? user.city : "---"}</div>
      </div>
      <div className="infoItem">
        <div className="infoItemKey">From:</div>
        <div className="infoItemValue"> {user.from ? user.from : "---"} </div>
      </div>
      <div className="infoItem">
        <div className="infoItemKey">Relationship:</div>
        <div className="infoItemValue">
          {user.relationship ? user.relationship : "---"}
        </div>
      </div>
    </div>
  );
}
