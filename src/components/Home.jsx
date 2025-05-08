import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav"; // <== legg til denne importen

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const apiKey = "V1AMlgj055WhvVHBvdjBPdaeOn7vZrRZ";
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        const firstEvent = json._embedded?.events?.[0];
        if (firstEvent) {
          setEvents([firstEvent]);
        }
      } catch (error) {
        console.error("Feil ved henting av event fra Ticketmaster:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home">
      <Nav /> {/* <-- Vis navigasjonen her */}
      <h1>Utvalgte Festivaler</h1>
      <div>
        {events.map((event) => (
          <article key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <Link to={`/event/${event.id}`} className="link-button">
              Se detaljer
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
