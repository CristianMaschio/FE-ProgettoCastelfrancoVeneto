import * as React from "react";
import ListPlacePreview from "../../components/ListPlacePreview/ListPlacePreview";

interface Props {}

interface State {}

export default class Lab extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Prova</h1>
        
        <h2>Lab: ListPlacePreview</h2>
        <ListPlacePreview />
      </div>
    );
  }
}
