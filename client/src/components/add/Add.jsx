import "./add.css";

export default function Add() {
  const PF = process.env.REACT_APP_ASSETS;
  return (
    <div className="addContainer">
      <img src={`${PF}ad.png`} alt="ad" className="addImg" />
    </div>
  );
}
