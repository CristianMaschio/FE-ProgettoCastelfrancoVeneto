import "./Header.css";
import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
    
  render() {
    return (
      <header className={`header`}>
        <Link to={`/`} className="leftHeader a">NearToMe</Link>
        <Link to={`/ImageScan`} className="rightHeader a">Scopri cos'è?</Link>
      </header>
    );
  }
}
