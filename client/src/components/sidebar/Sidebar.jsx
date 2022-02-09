import "./sidebar.css";
import {
  Chat,
  HelpOutline,
  School,
  WorkOutline,
  Event,
  RssFeed,
  VideoLibrarySharp,
  Bookmark,
} from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import { Users } from "../../dummyData";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarFeatures">
          <li className="sidebarFeature">
            <RssFeed className="sidebarFeatureIcon" htmlColor="#cdb4db" />
            <span className="sidebarFeatureText">Feed</span>
          </li>
          <li className="sidebarFeature">
            <Chat className="sidebarFeatureIcon" htmlColor="#ffc8dd" />
            <span className="sidebarFeatureText">Chats</span>
          </li>{" "}
          <li className="sidebarFeature">
            <VideoLibrarySharp
              className="sidebarFeatureIcon"
              htmlColor="#ffafcc"
            />
            <span className="sidebarFeatureText">Videos</span>
          </li>{" "}
          <li className="sidebarFeature">
            <Bookmark className="sidebarFeatureIcon" htmlColor="#bde0fe" />
            <span className="sidebarFeatureText">Bookmarks</span>
          </li>{" "}
          <li className="sidebarFeature">
            <HelpOutline className="sidebarFeatureIcon" htmlColor="#a2d2ff" />
            <span className="sidebarFeatureText">Questions</span>
          </li>{" "}
          <li className="sidebarFeature">
            <WorkOutline className="sidebarFeatureIcon" htmlColor="#457b9d" />
            <span className="sidebarFeatureText">Job</span>
          </li>{" "}
          <li className="sidebarFeature">
            <Event className="sidebarFeatureIcon" htmlColor="#f4a261" />
            <span className="sidebarFeatureText">Events</span>
          </li>{" "}
          <li className="sidebarFeature">
            <School className="sidebarFeatureIcon" htmlColor="#e76f51" />
            <span className="sidebarFeatureText">Courses</span>
          </li>{" "}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarClosFriends">
          {Users.map((friend) => (
            <CloseFriend key={friend.id} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
}
