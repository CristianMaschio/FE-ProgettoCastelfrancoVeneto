import "./PlacePreview.css";
import * as React from "react";
import { Place, getPlaceDate } from "../../services/models/Place";
import { Link } from "react-router-dom";

type Props = {
  place: Place;
};

export default class PlacePreview extends React.Component<Props> {
  render() {
    const { place } = this.props;

    return (
      <div className="marker-container">
        <img
          className="place-preview-picture"
          src={place.image}
          alt={place.name}
        />
        <div className="marker-text">
          {!place.isStand && (
            <>
              <span>Inzio:</span>
              <span style={{float: "right"}}>{getPlaceDate(place.startDate)}</span>
            </>
          )}
          <h5 className="place-preview-title">
            <Link style={{color: "#ff9900"}} to={`/Item/${place.id}`}>{place.name}</Link>
          </h5>
          <span className="marker-text">{place.description}</span>
        </div>
      </div>
    );
  }
}
