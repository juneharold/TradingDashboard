import Inputs from "./login-page/Inputs";
import "./LoginPage.css";

export default function Form({type, handleProceed, handleFormPage}) {
  return (
    <div className="inner-box">
        <Inputs type={type} handleProceed={handleProceed} handleFormPage={handleFormPage}/>
    </div>
  );
};

