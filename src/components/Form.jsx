import Inputs from "./Inputs";
import "./Form.css";

export default function Form({type, handleProceed, handleFormPage}) {
  return (
    <div className="inner-box">
        <Inputs type={type} handleProceed={handleProceed} handleFormPage={handleFormPage}/>
    </div>
  );
};

