import "../style/Login.css";
import {Link, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useState} from "react";
import axios from "../axios";
import {actionTypes} from "../reducer";
import {useStateValue} from "../StateProvider";

function Login() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const signIn = () => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.data.user,
          token: res.data.token,
        });
        history.push("/");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://img.icons8.com/color/452/whatsapp--v1.png" alt="WhatsApp Icon" />
        <div className="login__form">
          <h1>Sign in to WhatsApp</h1>
          <input type="email" placeholder="Email" onChange={emailChangeHandler} />
          <input type="password" placeholder="Password" onChange={passwordChangeHandler} />
        </div>
        <Button onClick={signIn}>Sign In</Button>
        <h3>
          Don't have an account yet?{"  "}
          <Link to="/register" className="link">
            Sign up now!
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;
