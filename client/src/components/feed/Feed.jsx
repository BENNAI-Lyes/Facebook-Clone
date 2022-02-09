import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get("/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [user, username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(user.username === username || !username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
