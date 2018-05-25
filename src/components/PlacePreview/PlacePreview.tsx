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
      <div className={``}>
        <img
          className="place-preview-picture"
          src={place.image}
          alt={place.name}
        />
        <div className="media-body fs-1">
          <span className="text-uppercase">{getPlaceDate(place)}</span>
          <h5 className="place-preview-title">
            <Link to={`/Item/${place.id}`}>{place.name}</Link>
          </h5>
          <p>{place.description}</p>
        </div>
      </div>
    );
  }
}
