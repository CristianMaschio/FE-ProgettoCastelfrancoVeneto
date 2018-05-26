import "./ImageScan.css";
import * as React from "react";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
}
interface State {
}

export default class ImageScan extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
    };
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
      <p>prova</p>
      </div>
    );
  }
}
