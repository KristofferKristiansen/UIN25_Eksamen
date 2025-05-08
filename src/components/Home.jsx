import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const keywords = ["Findings", "Neon", "Skeikampenfestivalen", "Tons of Rock"];
      const apiKey = "V1AMlgj055WhvVHBvdjBPdaeOn7vZrRZ";
      const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";

      try {
        const results = await Promise.all(
          keywords.map(async (keyword) => {
            const res = await fetch(
              `${baseUrl}?keyword=${encodeURIComponent(keyword)}&countryCode=NO&apikey=${apiKey}`
            );
            const data = await res.json();
            return data._embedded?.events?.[0];
          })
        );

        const filtered = results.filter(Boolean);
        setEvents(filtered);
      } catch (error) {
        console.error("Feil ved henting av festivaler:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home">
      <h1>Utvalgte Festivaler</h1>
      <div className="card-container">
        {events.map((event) => (
          <article key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <Link to={`/event/${event.id}`} className="link-button">Se detaljer</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
