import "./ItemDetails.css";
import * as React from "react";
import { match } from "react-router-dom";
import Gallery from "react-grid-gallery";
import { Place } from "../../services/models/Place";
import { getPlace } from "../../services/api/places";
import Spinner from "../../components/Spinner/Spinner";

const images = [
  {
    src: "https://picsum.photos/564/487",
    thumbnail: "https://picsum.photos/564/487",
    thumbnailWidth: 564,
    thumbnailHeight: 487,
    isSelected: false,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://picsum.photos/789/456",
    thumbnail: "https://picsum.photos/789/456",
    thumbnailWidth: 789,
    thumbnailHeight: 456,
    caption: "Boats (Jeshu John - designerspics.com)"
  },
  {
    src: "https://picsum.photos/984/600",
    thumbnail: "https://picsum.photos/984/600",
    thumbnailWidth: 984,
    thumbnailHeight: 600
  },
  {
    src: "https://picsum.photos/94/200",
    thumbnail: "https://picsum.photos/94/200",
    thumbnailWidth: 94,
    thumbnailHeight: 200
  }
  ,
  {
    src: "https://picsum.photos/700/600",
    thumbnail: "https://picsum.photos/700/600",
    thumbnailWidth: 700,
    thumbnailHeight: 600
  }
  ,
  {
    src: "https://picsum.photos/486/569",
    thumbnail: "https://picsum.photos/486/569",
    thumbnailWidth: 486,
    thumbnailHeight: 569
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
      <div className="container-item">
        <div className="left">
          <div className="place-image" style={{ backgroundImage: `url(` + this.state.place.image + `)` }} />
        </div>
        <div className="right">
          <h1 className="title">{this.state.place.name}</h1>
          <p className="description">{this.state.place.description}</p>

          <div className="my-tag-row">

            <div className="my-tag-contaiener">
              <div className="my-tag">
                <span className="tag-title">#arte</span>
              </div>
              <div className="my-tag">
                <span className="tag-title">#quadro</span>
              </div>
            </div>

          </div>
          <h1 className="title margin-bottom">Altre immagini</h1>

          <Gallery images={images} enableImageSelection={false} />
        </div>

      </div>
    );
  }
}
