import "./style/App.css";
import Pusher from "pusher-js";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import {useEffect} from "react";

function App() {
  useEffect(() => {
    const pusher = new Pusher("1b880ea365d7733fc7e7", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
