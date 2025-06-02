import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="content" id="about-section">
      
      <h1>A Global Outlook Of DEAF-MUTE Community</h1>
      <div className="sign_img">
      <img 
        src={`${process.env.PUBLIC_URL}/assests/deaf_mute.png`} 
        alt="Background" 
        loading="eager"
      />
      </div>
      <div className="content_subText">
        <div className="content_boxText">
          <h3>
            <span>430,000,000</span>
            <br /> People worldwide have <br /> disabling hearing loss.
          </h3>
          <h3>
            <span>300</span>
            <br /> Different sign languages that <br /> are currently undocumented.
          </h3>
          <h3>
            <span>27,000,000</span>
            <br /> People have some form <br /> of hearing disability.
          </h3>
        </div>
      </div>
    </div>
  );
}
