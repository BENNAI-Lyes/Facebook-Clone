import { MoreVert } from "@material-ui/icons";
import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_ASSETS;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post, currentUser]);

  const handelLikeClick = async () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    try {
      await axios.put("/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post]);

  return (
    <div className="postContainer">
      <div className="postTop">
        <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/person/noavatar.webp"
              }
              alt="profile"
              className="postProfileImg"
            />
          </Link>
          <div className="postName">{user.username}</div>
          <div className="postDate">{format(post.createdAt)}</div>
        </div>
        <div className="postTopRight">
          <MoreVert className="postTopIcon" />
        </div>
      </div>
      <div className="postCenter">
        <div className="postDesc">{post?.desc}</div>
        <img src={PF + post.img} alt="post" className="postImg" />
      </div>
      <div className="postBottom">
        <div className="postLeft">
          <img
            src={`${PF}/like.png`}
            alt="like"
            className="postLikeImg"
            onClick={handelLikeClick}
          />
          <img
            src={`${PF}/heart.png`}
            alt="heart"
            className="postLikeImg"
            onClick={handelLikeClick}
          />
          <span className="likeCounts">{like}</span>
        </div>
        <div className="postRight">{post?.comments.length} comments </div>
      </div>
    </div>
  );
}
