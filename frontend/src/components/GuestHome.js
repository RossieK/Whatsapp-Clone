import "../style/GuestHome.css";
import {Link} from "react-router-dom";

function GuestHome() {
  return (
    <div className="home__container">
      <h1>
        Please{" "}
        <Link to="/register" className="link">
          Register
        </Link>{" "}
        /{" "}
        <Link to="/login" className="link">
          Login
        </Link>{" "}
        to message your friends and family
      </h1>
      <img src="https://ichef.bbci.co.uk/news/640/cpsprodpb/05F7/production/_103272510_gettyimages-1001511110-1.jpg" alt="WhatsApp logo" />
    </div>
  );
}

export default GuestHome;
