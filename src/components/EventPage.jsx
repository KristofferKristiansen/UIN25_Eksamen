import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams(); //Bruker Useparams for å hent ID-en fra URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY; 
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
    <main>
      <h1>{event.name}</h1>
      
    </main>
  );
}
