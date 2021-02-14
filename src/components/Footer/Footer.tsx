import React from "react";
import "./Footer.scss";

const Footer: React.FC<{}> = () => {
  const date: Date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer-div">
      <p className="copyright-text">
        Copyright © {year}
        <p>
          Designed with <i className="fa fa-heart"></i> by Anubhav
        </p>
      </p>
    </div>
  );
};

export default Footer;
