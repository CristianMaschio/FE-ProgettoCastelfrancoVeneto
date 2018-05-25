import "./ListPlacePreview.css";
import "../../services/css/animate.css";
import * as React from "react";
import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";
import { Place, getPlaceDate } from "../../services/models/Place";

type Props = {
  places: Place[];
};

export default class ListPlacePreview extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  renderPlacePreview(place: Place) {
    return (
      <Link to={`/Item/${place.id}`} key={place.id}>
        <div className="card fadeInLeft">
          <div className="card-image-container">
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${place.image})`
              }}
            />
          </div>
          <div className="card-description">
            <div className="flex row">
              <span className="title">{place.name}</span>
              {place.isStand && (
                <StarRatingComponent
                  className="star-rating"
                  name="rate1"
                  starCount={5}
                  value={place.rate}
                />
              )}
            </div>
            {!place.isStand && (
              <>
                <div className="flex row">
                  <span className="sub-title">Data inizio: </span>
                  <span
                    className="sub-title"
                    style={{
                      flex: "right",
                      textAlign: "right",
                      marginRight: "3em"
                    }}
                  >
                    {getPlaceDate(place.startDate)}
                  </span>
                </div>
                <div className="flex row">
                  <span className="sub-title">Data fine:</span>
                  <span
                    className="sub-title"
                    style={{
                      flex: "right",
                      textAlign: "right",
                      marginRight: "3em"
                    }}
                  >
                    {getPlaceDate(place.endDate)}
                  </span>
                </div>
              </>
            )}
            <p className="description">{place.description} </p>
            <div className="tag">
              <span className="tag-title">
                {place.tags.map(tag => tag.title)})}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="container">
        {this.props.places.map(place => {
          return this.renderPlacePreview(place);
        })}
      </div>
    );
  }
}
