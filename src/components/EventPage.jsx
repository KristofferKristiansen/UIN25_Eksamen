import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/eventpage.scss"; // Importer SCSS-filen

export default function EventPage() {
  const { id } = useParams(); //Bruker Useparams for å hent ID-en fra URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
      try {
        const res = await fetch( //Gjør et kall på API til Ticketmaster for å hente spesifikt event basert på ID
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`
        );
        if (!res.ok) {
          throw new Error('Event ikke funnet');
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) { //Feilhåndtering. Hvis noe går galt, setter det en error
        setError(error.message); 
        console.error("Feil ved henting av event:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Laster inn...</p>;
  if (error) return <p>Beklager, noe gikk galt: {error}</p>;

  return (
    <main className="eventpage">
      <h1>{event.name}</h1>

      <h3>Sjanger:</h3>
      <ul className="genres">
        {[...new Set(
          event.classifications?.flatMap(item => [
            item.segment?.name,
            item.genre?.name,
            item.subGenre?.name
          ]).filter(Boolean)
        )].map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>

      <section className="social">
        <p><strong>Følg oss på sosiale medier:</strong></p>
        <ul className="social-icons">
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </li>
        </ul>
      </section>

      <h3>Festivalpass:</h3>
      <ul className="passes">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="pass-card">
            <img
              src={event.images?.[0]?.url}
              alt={event.name}
            />
            <h4>
              {event.name} {i === 1 ? "- Premium Festivalpass" : i === 2 ? "- Dagspass Fredag" : "- Festivalpass"}
            </h4>
            <p>{event._embedded?.venues?.[0]?.name || "Ukjent sted"}</p>
            <p>{event.dates?.start?.localDate || "Ukjent dato"}</p>
            <ul className="actions">
              <li><button>Kjøp</button></li>
              <li><button className="wishlist">Legg til i ønskeliste</button></li>
            </ul>
          </li>
        ))}
      </ul>

      {event._embedded?.attractions && (
        <>
          <h3>Artister:</h3>
          <article className="artists">
            <ul className="artist-list">
              {event._embedded.attractions
                .filter((artist) => {
                  const name = artist.name?.toLowerCase();
                  const genre = artist.classifications?.[0]?.genre?.name?.toLowerCase();

                  // Fjern "Findings Festival" og uønskede sjangre
                  return (
                    name !== "findings festival" &&
                    genre !== "festival" &&
                    genre !== "miscellaneous"
                  );
                })
                .map((artist) => (
                  <li key={artist.id} className="artist-card">
                    <img
                      src={artist.images?.[0]?.url}
                      alt={artist.name}
                    />
                    <p>{artist.name}</p>
                  </li>
                ))}
            </ul>
          </article>
        </>
      )}
    </main>
  );
}
