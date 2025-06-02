import React, { useState, useEffect } from "react";
import "./Preloader.css"; // Import the CSS file

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000)
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // Hide preloader when done

  return (
    <div className="preloader">
       <img 
        src={`${process.env.PUBLIC_URL}/assests/loader.gif`}
        alt="Background" 
        loading="eager"
        className="preloader-gif"
      />
    </div>
  );
};

export default Preloader;
