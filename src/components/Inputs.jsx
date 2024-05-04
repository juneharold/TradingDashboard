import "./Inputs.css";
export default function Inputs({type, handleProceed, handleFormPage}) {
  return (
    <div className="form-box">
      <b className="form-title">{type==="login" ? "Log in" : "Sign up"} to FBA Quant</b>
      <div className="small-text">{`Quick & Simple way to Automate your investment`}</div>
      <div className="frame-group">
        <div className="outer-frame">
          {type==="signup" && <div className="inner-frame">
            <div className="text-frame">
              <div className="input-type">Full Name</div>
              <input
                className="placeholder-text"
                placeholder="John Doe"
                type="name"
              />
            </div>
            </div>}
          <div className="inner-frame">
            <div className="text-frame">
              <div className="input-type">EMAIL ADRRESS</div>
              <input
                className="placeholder-text"
                placeholder="johndoe@example.com"
                type="email"
              />
            </div>
          </div>
          <div className="inner-frame">
            <div className="text-frame">
              <div className="input-type">PASSWORD</div>
              <input className="placeholder-text" type="password" />
            </div>
          </div>
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
  );
}
