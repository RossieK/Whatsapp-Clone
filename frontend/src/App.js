import "./style/App.css";
import Pusher from "pusher-js";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import axios from "./axios";
import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("1b880ea365d7733fc7e7", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="App">
      <div className="app__body">
        <Switch>
          <Sidebar />
          <Route path="/rooms/:roomId">
            <Chat messages={messages} />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
