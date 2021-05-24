import "../style/Login.css";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

function Login() {
  const emailChangeHandler = () => {};
  const passwordChangeHandler = () => {};
  const signIn = () => {};

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
