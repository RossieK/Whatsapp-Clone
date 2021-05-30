import "../style/SidebarChat.css";
import {Avatar} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../axios";

function SidebarChat({addNewChat, id, name, messages}) {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    if (id) {
      let roomMessages = messages.filter((message) => message.room.toString() === id.toString());
      setLastMessage(roomMessages[roomMessages.length - 1].message);
    }
  }, [id, messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      await axios.post("/rooms/new", {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`} className="linkRoom">
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{lastMessage}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
