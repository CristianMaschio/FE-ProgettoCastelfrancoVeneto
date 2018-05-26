import * as React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import PlacePreview from "../PlacePreview/PlacePreview";
import { Place, Coordinate  } from "../../services/models/Place";

type Props = {
  center: { lat: number; lng: number };
  places: Place[];
};

type State = {
  activeMarkerId: string;
  position: Coordinate;
};

class Map extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeMarkerId: "",
      position: null
    };

    this.handlePosition = this.handlePosition.bind(this);
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition);
    }
  }

  handleToggleMarker(markerId: string) {
    this.setState({
      activeMarkerId: this.state.activeMarkerId === markerId ? "" : markerId
    });
  }

  isMarkerOpen(markerId: string) {
    return markerId === this.state.activeMarkerId;
  }

  getMarker(isStand: Boolean) {
    if (!isStand) return require("./markerPlace.png");
    else return require("./marker.png");
  }

  renderPlaceMarker(place: Place) {
    console.log(place);
    return (
      <Marker
        key={place.id}
        position={{
          lat: place.coordinate.latitude,
          lng: place.coordinate.longitude
        }}
        icon={this.getMarker(place.isStand)}
        onClick={() => this.handleToggleMarker(place.id)}
      >
        {this.isMarkerOpen(place.id) && (
          <InfoWindow onCloseClick={() => this.handleToggleMarker(place.id)}>
            <div style={{ width: "18rem" }}>
              <PlacePreview place={place} />
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }

  handlePosition(position) {
    this.setState({
      position: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  }

  render() {
    const places = this.props.places;
    const placeMarkers =
      places &&
      places.map(value => {
        return this.renderPlaceMarker(value as Place);
      });

    return (
      <GoogleMap defaultZoom={16} defaultCenter={this.props.center}>
        <MarkerClusterer averageCenter gridSize={30}>
          {placeMarkers}
          {this.state.position &&
      <Marker
        position={{
          lat: this.state.position.latitude,
          lng: this.state.position.longitude
        }}
      />}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
