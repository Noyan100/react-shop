import React from "react";
import "./Loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo">ТЕХНО | СТРОЙ</div>
        <div className="loader">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
