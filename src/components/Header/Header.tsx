import "./Header.css";
import * as React from "react";

export default class Header extends React.PureComponent {
    
  render() {
    return (
      <header className={`header`}>
        <a className="leftHeader">NearToMe</a>
        <a className="rightHeader">Scopri cos'è?</a>
      </header>
    );
  }
}
