import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY; 
      try {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`
        );
        if (!res.ok) {
          throw new Error('Event ikke funnet');
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
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
