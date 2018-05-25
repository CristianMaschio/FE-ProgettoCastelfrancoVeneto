import * as React from "react";
import ListPlacePreview from "../../components/ListPlacePreview/ListPlacePreview";

interface Props {}

interface State {}

export default class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Test Lab</h1>
        <ListPlacePreview />
      </div>
    );
  }
}
