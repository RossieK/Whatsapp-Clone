import "../style/Chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../axios";

function Chat({messages}) {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState("");
  const {roomId} = useParams();

  useEffect(() => {
    if (roomId) {
      axios
        .get("/rooms/sync/" + roomId)
        .then((res) => {
          setRoomName(res.data.name);
        })
        .catch((err) => console.error(err));
    }

    let currentMessages = messages.filter((message) => message.room.toString() === roomId.toString());
    setRoomMessages(currentMessages);
    setLastSeen(currentMessages[currentMessages.length - 1].timestamp);
  }, [roomId, messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "$name",
      timestamp: new Date().toISOString().slice(0, 10),
      received: true,
      room: roomId,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen: {lastSeen}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {roomMessages.map((message, index) => (
          <p key={index} className={`chat__message ${message.received ? "chat__receiver" : ""}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonOutlinedIcon />
        <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">
            <SendOutlinedIcon />
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
