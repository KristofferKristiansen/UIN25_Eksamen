import "../styles/moreeventcards.scss";

{/*Funksjonell React komponent som tar imot eventer, henter også ut navn, dato, bilde, tid etc.*/}
export default function MoreEventCards({ event }) {
  const image = event.images?.[0]?.url;
  const name = event.name;
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const country = event._embedded?.venues?.[0]?.country?.name;
  const city = event._embedded?.venues?.[0]?.city?.name;
  const venue = event._embedded?.venues?.[0]?.name;

  {/*Hva de ulike komponentene skal vise*/}
  return (
    <article className="visual-card">
      {image && <img src={image} alt={name} />}
      <h2>{name}</h2>
      <p>{date}</p>
      <p>{time}</p>
      <p>{country}</p>
      <p>{city}</p>
      <p>{venue}</p>
    </article>
  );
}
