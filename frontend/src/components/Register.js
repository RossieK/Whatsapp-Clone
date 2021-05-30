import "../style/Register.css";
import {Link, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useState} from "react";
import {useStateValue} from "../StateProvider";
import axios from "../axios";
import {actionTypes} from "../reducer";

function Register() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const rePasswordChangeHandler = (e) => {
    setRePassword(e.target.value);
  };
  const signUp = () => {
    axios
      .post("/register", {
        email,
        password,
        rePassword,
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
    <div className="register">
      <div className="register__container">
        <img src="https://img.icons8.com/color/452/whatsapp--v1.png" alt="WhatsApp Icon" />
        <div className="register__form">
          <h1>Sign up to WhatsApp</h1>
          <input type="email" placeholder="Email" onChange={emailChangeHandler} />
          <input type="password" placeholder="Password" onChange={passwordChangeHandler} />
          <input type="password" placeholder="Repeat Password" onChange={rePasswordChangeHandler} />
        </div>
        <Button onClick={signUp}>Sign Up</Button>
        <h3>
          Already have an account?{"  "}
          <Link to="/login" className="link">
            Sign in now!
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Register;
