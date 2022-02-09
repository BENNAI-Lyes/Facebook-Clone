import "./birthday.css";

export default function Birthday() {
  const PF = process.env.REACT_APP_ASSETS;
  return (
    <div className="birthdayContainer">
      <img src={`${PF}gift.png`} alt="gift" className="birthdayImg" />
      <span className="birthdayNames">
        <b className="birthdayName">Pola Faster</b> and{" "}
        <b className="birthdayName">3 other friends</b> have a birthday today
      </span>
    </div>
  );
}
