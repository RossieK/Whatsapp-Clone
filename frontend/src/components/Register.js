import "../style/Register.css";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

function Register() {
  const emailChangeHandler = () => {};
  const passwordChangeHandler = () => {};
  const rePasswordChangeHandler = () => {};
  const signIn = () => {};

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
        <Button onClick={signIn}>Sign Up</Button>
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
