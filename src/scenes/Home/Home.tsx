import "./Home.css";
import * as React from "react";
import Map from "../../components/Map/Map";
import { Place } from "../../services/models/Place";
import { getPlaces } from "../../services/api/places";
import Spinner from "../../components/Spinner/Spinner";
import ListPlacePreview from "../../components/ListPlacePreview/ListPlacePreview";

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
    if (this.state.places.length === 0) {
      return (
        <div className="event">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="home">
        <h4 style={{ margin: "0.5em", textAlign: "center" }}>
        😎 Scopri e conosci quello che hai attorno a te con la nuova app di
          Castelfranco Veneto 😎
        </h4>
        <Map
          center={{ lat: 45.6716977, lng: 11.9265608 }}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          places={this.state.places}
        />
        <ListPlacePreview places={this.state.places} />
      </div>
    );
  }
}
