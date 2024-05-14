import Inputs from "./login-page/Inputs";
import "./LoginPage.css";

export default function LoginPage({ type, handleProceed, handleFormPage }) {
  return (
    <div className="inner-box">
      <div className="form-box">
        <b className="form-title">
          {type === "login" ? "Log in" : "Sign up"} to FBA Quant
        </b>
        <div className="small-text">{`Quick & Simple way to Automate your investment`}</div>
        <div className="frame-group">
          <div className="outer-frame">
            {type === "signup" && (
              <Inputs type="name"/>
            )}
            <Inputs type="email" />
            <Inputs type="password" />
          </div>
          <div className="checkbox-frame">
            <input className="checkbox" type="checkbox" />
            <div className="remember-me">Remember Me</div>
          </div>
          <button className="button1" onClick={handleProceed}>
            <div className="proceed-text">PROCEED</div>
          </button>
        </div>
        <div className="or">OR</div>
        <button className="button2" onClick={handleFormPage}>
          No account yet? Register now
        </button>
      </div>
    </div>
  );
}
