import "./Home.css";
import * as React from "react";
import { Place } from "../../services/models/Place";
import { getPlaces } from "../../services/api/places";

interface Props {}

interface State {
  places: Place[];
}

export default class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }

  componentWillMount() {
    getPlaces().then(places => {
      console.log(places);
      if (places) this.setState({ places });
    });
  }
  render() {
    return (
      <div className="home">
        <h1>NearToMe</h1>
      </div>
    );
  }
}

/*
import Map from "../../components/Map/Map";

        <Map
          center={{ lat: 45.6716977, lng: 11.9265608 }}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          places={this.state.places}
        />
 */