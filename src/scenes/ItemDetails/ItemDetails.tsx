import "./ItemDetails.css";
import * as React from "react";
import { match } from "react-router-dom";
import Gallery from "react-grid-gallery";
import { Place } from "../../services/models/Place";
import { getPlace } from "../../services/api/places";
import Spinner from "../../components/Spinner/Spinner";

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: true,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" }
    ],
    caption: "Boats (Jeshu John - designerspics.com)"
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212
  }
];

interface Props {
  match: match<{ itemId: string }>;
}
interface State {
  place: Place;
  error: string;
}

export default class ItemDetails extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      place: null,
      error: ""
    };
  }

  componentWillMount() {
    const itemId = this.props.match.params.itemId;
    console.log(itemId);
    getPlace(itemId).then(place => {
      if (!place) {
        this.setState({
          error: "L'oggetto non è stato trovato nel database 😥"
        });
      } else {
        console.log(place);
        this.setState({ place });
      }
    });
  }

  render() {
    if (this.state.error !== "") {
      return (
        <div>
          <h1>{this.state.error}</h1>
        </div>
      );
    }

    if (!this.state.place) {
      return (
        <div className="event">
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <div className="place-page">
          <img
            className={"place-page-picture"}
            src={this.state.place.image}
            alt="immagine selezionata"
          />
          <div className="l2">
            <h1 style={{ textAlign: "center" }}>{this.state.place.name}</h1>
            <p>{this.state.place.description}</p>
          </div>
        </div>

        <div
          style={{
            display: "block",
            minHeight: "1px",
            width: "100%",
            border: "1px solid #ddd",
            overflow: "auto"
          }}
        >
          <Gallery images={images} enableImageSelection={false} />
        </div>
      </div>
    );
  }
}
