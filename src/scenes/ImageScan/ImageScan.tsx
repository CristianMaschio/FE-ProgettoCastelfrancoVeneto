import "./ImageScan.css";
import * as React from "react";
import Spinner from "../../components/Spinner/Spinner";
// import Webcam from 'react-webcam';
import fetch from 'isomorphic-fetch';

// import { callAPI_ } from "../../services/api/callAPI";
// import * as clm from "./js/clmtrackr.js";

interface Props { }
interface State { webcamSwitch: boolean; }

export default class ImageScan extends React.PureComponent<Props, State> {

  // private webcam = null;

  constructor(props) {

    super(props);

    this.state = {
      webcamSwitch: false
    };

    this.capture = this.capture.bind(this);
  }

  setRef = (webcam) => {
    // this.webcam = webcam;
  }

  startStream = () => {

    document.getElementById("c").style.display = "none";
    document.getElementById("v").style.display = "block";

    this.setState({ webcamSwitch: true });

    navigator.mediaDevices.enumerateDevices().then(res => {
      console.log(res);
      if (res.length > 5) {
        navigator.getUserMedia({ video: { deviceId: res[5].deviceId } }, (stream) => {
          const video: HTMLVideoElement = document.getElementById("v") as HTMLVideoElement;
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, (err) => { alert("there was an error " + err); });
      } else {
        navigator.getUserMedia({ video: true, audio: false }, (stream) => {
          const video: HTMLVideoElement = document.getElementById("v") as HTMLVideoElement;
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, (err) => { alert("there was an error " + err); });
      }
    });
  }

  capture = () => {

    document.getElementById("c").style.display = "block";
    document.getElementById("v").style.display = "none";

    const video: HTMLVideoElement = document.getElementById("v") as HTMLVideoElement;
    const canvas: HTMLCanvasElement = document.getElementById("c") as HTMLCanvasElement;

    canvas.getContext("2d").drawImage(video, 0, 0, 360, 290);

    const imageSrc = canvas.toDataURL("image/png");

    const BASE64_MARKER = ';base64,';
    if (imageSrc.indexOf(BASE64_MARKER) === -1) {
      const parts = imageSrc.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }

    const _parts = imageSrc.split(BASE64_MARKER);
    const _contentType = _parts[0].split(':')[1];
    const _raw = window.atob(_parts[1]);
    const rawLength = _raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = _raw.charCodeAt(i);
    }

    return fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/5e20bca9-cbf2-482f-9d16-123ad906c1f9/image?iterationId=e9c0e087-f1fc-4cb5-8b8c-82d7eca709c8', {
      method: 'POST',
      mode: 'CORS',
      body: new Blob([uInt8Array], { type: _contentType }),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Prediction-Key': '156e4ef9a72e46c5a103c17691463b0f',
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
        if (json.predictions.length > 0) {
          alert(json.predictions[0].tagName);
        }
      })
      .catch(err => err);

  }

  render() {
    if (!this.state) {
      return (
        <div className="event">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="screen-view">
        <video className="fotocamera-stream" id="v" width="300" height="300" />
        <canvas className="canvas-fotocamera" id="c" width="300" height="300" />
        <div className="button-actions">
          <button className="button-stream" onClick={this.startStream}>Start</button>
          <button className="button-camera" onClick={this.capture}>Scatta</button>
        </div>
      </div>
    );
  }
}
