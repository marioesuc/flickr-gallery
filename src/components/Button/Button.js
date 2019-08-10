import React from "react";
import "./Button.css";

// Custom button component
class Button extends React.Component {
  render() {
    const { onClick, text } = this.props;

    return (
      <div onClick={() => onClick()} className="Button-container">
        <div className="Button-content">{text}</div>
      </div>
    );
  }
}

export default Button;
