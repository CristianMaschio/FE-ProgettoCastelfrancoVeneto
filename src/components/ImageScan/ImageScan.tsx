import "./ListPlacePreview.css";
import "../../services/css/animate.css";
import "../../services/js/clmtrackr.js";
import * as React from "react";

export default class PlacePreview extends React.PureComponent {
  render() {
    return (
      <div className="container" >
        <img className="imageel" src="https://images.vanityfair.it/wp-content/uploads/2018/03/02112958/landscape3-950x684.jpg" alt="" />
        <video className="videoel" preload="auto"> </video>
        <canvas className="overlay" ></canvas>
        <canvas className="webgl"></canvas>
      </div>
    );
  }
}
