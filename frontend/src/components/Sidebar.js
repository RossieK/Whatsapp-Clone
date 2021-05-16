import "../style/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import {Avatar, IconButton} from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import {useEffect, useState} from "react";
import axios from "../axios";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("/rooms/sync")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://creative.unab.edu.co/wp-content/uploads/2019/02/avatar.png" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search for a specific chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
