import React, { useState, useEffect } from "react";
import MainComponent from "./MainComponent/MainComponent"; 
import Preloader from "./Preloader/Preloader";
import "./App.css";


const App = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false); // Manage fade-in effect

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setFade(true);
      }, 100); // Slight delay for smooth fade-in
    }
  }, [loading]);

  return (
    <div>
      {loading && <Preloader />}
      <div className={`main-content ${fade ? "fade-in" : ""}`}>
        <MainComponent />
      </div>
    </div>
  );
};

export default App;

// import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import Home from './Pages/HomePage/Home'
// // import Layout from './Pages/Layout/Layout'
// // import ConvertPage from './Pages/ConvertPage/ConvertPage'
// // import TextToSignPage from './Pages/ConvertPage/TextToSignPage'
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainComponent from './MainComponent/MainComponent';
// export default function App(){

// const appRef = useRef(null);
//   // useEffect(() => {
//   //   gsap.fromTo(
//   //     appRef.current, 
//   //     { opacity: 0, y: 20 }, // Initial state (hidden, slightly down)
//   //     { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" } // Final state (visible)
//   //   );
//   // }, []);

//   return (
//     <div>
//     {/* <Router>
//     <Routes>
//       <Route element={<Layout/>}>
//         <Route path='/' element={<Home/>} />
//         <Route path="translate" element={<ConvertPage/>} />
//         <Route path='texttosign' element={<TextToSignPage/>}/>
//       </Route>
//     </Routes>
//   </Router> */}
//   <MainComponent/>
//   </div>
//   );
// }

