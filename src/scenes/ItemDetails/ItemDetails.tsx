import "./ItemDetails.css";
import * as React from "react";
import { match } from "react-router-dom";
import Gallery from "react-grid-gallery";
import { Place } from "../../services/models/Place";
import { getPlace } from "../../services/api/places";
import Spinner from "../../components/Spinner/Spinner";

const images = [
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/bolasco_29.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/bolasco_29.jpg",
    thumbnailWidth: 564,
    thumbnailHeight: 487,
    isSelected: false,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/giorgione_sezione.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/giorgione_sezione.jpg",
    thumbnailWidth: 789,
    thumbnailHeight: 456,
    caption: "Boats (Jeshu John - designerspics.com)"
  },
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/teatro_accademico.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/teatro_accademico.jpg",
    thumbnailWidth: 984,
    thumbnailHeight: 600
  },
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/il_castello.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/il_castello.jpg",
    thumbnailWidth: 2000,
    thumbnailHeight: 800
  }
  ,
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/bolasco2.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/bolasco2.jpg",
    thumbnailWidth: 486,
    thumbnailHeight: 569
  }
  ,
  {
    src: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/dumo.jpg",
    thumbnail: "https://www.comune.castelfrancoveneto.tv.it/public/foto/citta/dumo.jpg",
    thumbnailWidth: 1000,
    thumbnailHeight: 600
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
          <p className="descriptionItem">{this.state.place.description}</p>

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
