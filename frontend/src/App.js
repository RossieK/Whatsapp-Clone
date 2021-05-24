import "./style/App.css";
import Pusher from "pusher-js";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import axios from "./axios";
import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
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
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId" exact>
              <Chat messages={messages} />
            </Route>
            <Route path="/" exact></Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
