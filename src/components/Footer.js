import React, { Component } from "react";
import "../styles/style.css";

export class Footer extends Component {
  render() {
    return (
      <footer className="App-footer">
        <p>Developer: Cheng Cheng (Mia)</p>
        <p>
          Contact:
          <a
            className="App-footer-link"
            href="https://www.linkedin.com/in/cheng-cheng-mia/"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    );
  }
}

export default Footer;
