import { useMemo } from "react";
import "./PriceContainer.css";

const PriceContainer = ({
  meta11,
  meta,
  meta1,
  prop,
  prop1,
  group3,
  propLeft,
  propBackgroundColor,
  propColor,
  propColor1,
  propColor2,
  propColor3,
  propColor4,
  frameDivHeight,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      left: propLeft,
      backgroundColor: propBackgroundColor,
      height: frameDivHeight,
    };
  }, [propLeft, propBackgroundColor, frameDivHeight]);

  const metaStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  const meta1Style = useMemo(() => {
    return {
      color: propColor1,
    };
  }, [propColor1]);

  const divStyle = useMemo(() => {
    return {
      color: propColor2,
    };
  }, [propColor2]);

  const currentValueStyle = useMemo(() => {
    return {
      color: propColor3,
    };
  }, [propColor3]);

  const div1Style = useMemo(() => {
    return {
      color: propColor4,
    };
  }, [propColor4]);

  return (
    <div className="frame-parent4" style={frameDivStyle}>
      <div className="frame-parent5">
        <div className="meta-1-1-parent">
          <img className="meta-1-1-icon" alt="" src={meta11} />
          <div className="meta" style={metaStyle}>
            {meta}
          </div>
        </div>
        <div className="meta-parent">
          <div className="meta1" style={meta1Style}>
            {meta1}
          </div>
          <div className="div10" style={divStyle}>
            {prop}
          </div>
        </div>
      </div>
      <div className="frame-parent6">
        <div className="current-value-parent">
          <div className="current-value" style={currentValueStyle}>
            Current Value
          </div>
          <div className="div11" style={div1Style}>
            {prop1}
          </div>
        </div>
        <img className="group-icon" alt="" src={group3} />
      </div>
    </div>
  );
};

export default PriceContainer;
