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
      webcamSwitch: true
    };

    const video: HTMLVideoElement = document.getElementById("v") as HTMLVideoElement;
    navigator.mediaDevices.enumerateDevices().then(res => {
      console.log(res);
      navigator.getUserMedia({ video: { deviceId: res[5].deviceId } }, (stream) => {
        video.src = window.URL.createObjectURL(stream);
      }, function(err) { alert("there was an error " + err); });

    });

    this.capture = this.capture.bind(this);
  }

  setRef = (webcam) => {
    // this.webcam = webcam;
  }

  capture = () => {

    this.setState({ webcamSwitch: false });

    const video: HTMLVideoElement = document.getElementById("v") as HTMLVideoElement;
    const canvas: HTMLCanvasElement = document.getElementById("c") as HTMLCanvasElement;

    canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
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
      <div className="container">
        {/* {this.state.webcamSwitch && <Webcam
          audio={false}
          height={window.innerHeight - 200}
          width={window.innerWidth}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
        />} */}
        <button onClick={this.capture}>Capture photo</button>
        <video id="v" width="400" height="300" />
        <canvas id="c" width="400" height="300" />
      </div>
    );
  }
}
