import "./ListPlacePreview.css";
import "../../services/css/animate.css";
import * as React from "react";
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';

export default class PlacePreview extends React.PureComponent {
  render() {
    return (
      <div className="container">

        {/* Normal card */}
        <Link to='/ItemPage'>
          <div className="card fadeInLeft">
            <div className="card-image-container">
              <div className="card-image" style={{ backgroundImage: `url(https://picsum.photos/200/300)` }} />
            </div>
            <div className="card-description">
              <div className="flex row">
                <span className="title">Title</span>
                <StarRatingComponent className="star-rating" name="rate1" starCount={5} value={4} />
              </div>
              <p className="description">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Proin lorem felis, lobortis quis massa quis, auctor
              imperdiet ante.</p>
              <div className="tag">
                <span className="tag-title">#quadro</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Event card */}
        <Link to='/ItemPage'>
          <div className="card fadeInLeft">
            <div className="card-image-container">
              <div className="card-image" style={{ backgroundImage: `url(https://picsum.photos/201/300)` }} />
            </div>
            <div className="card-description">
              <span className="title">Evento</span>
              <span className="sub-title">25-26 Maggio</span>
              <p className="description">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Proin lorem felis, lobortis quis massa quis, auctor
              imperdiet ante.</p>
              <div className="tag">
                <span className="tag-title">#evento</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
