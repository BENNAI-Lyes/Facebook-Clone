import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Ad from "../add/Add";
import Birthday from "../birthday/birthday";
import Friends from "../friends/Friends";
import Info from "../info/Info";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import "./rightbar.css";
import { Add, Remove } from "@material-ui/icons";
import axios from "axios";

export default function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [isFollowed, setIsFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    setIsFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  const handelFollowClick = async () => {
    try {
      if (isFollowed) {
        await axios.put("/api/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/api/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <>
            {user.username !== currentUser.username && (
              <button
                className="rightbarFollowButton"
                onClick={handelFollowClick}
              >
                {isFollowed ? (
                  <>
                    UnFollow <Remove />
                  </>
                ) : (
                  <>
                    Follow <Add />
                  </>
                )}
              </button>
            )}
            <Info user={user} />
            <Friends user={user} />
          </>
        ) : (
          <>
            <Birthday />
            <Ad />
            <OnlineFriends />
          </>
        )}
      </div>
    </div>
  );
}
