import { Link } from "react-router-dom";
import "../styles/eventcard.scss";


export default function EventCard({ event }) {
  const image = event.images?.[0]?.url;
  const title = event.customTitle || event.name;

  {/*Brukergrensesnitt for eventkort*/}
  return (
    <article className="eventcard">
      {image && <img src={image} alt={title} />}
      <h2>{title}</h2>
      <Link to={`/event/${event.id}`} className="btn">
        Les mer om {title}
      </Link>
    </article>
  );
}
