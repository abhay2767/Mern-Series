/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar";
import { useEffect } from "react";
import './Design.css'

const Error = ({ setProgress }) => {
  useEffect(() => {
    setProgress(10);
    setProgress(50);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
  }, []);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  document.title = `${capitalize("Error-page")} - React_veet`;

  return (
    <>
      <Navbar />
      <div className="error-container">
        <h1>404 Error</h1>
        <p>Oops! Page not found.</p>
      </div>
    </>
  );
};

export default Error;