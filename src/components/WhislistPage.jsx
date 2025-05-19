import { useEffect, useState } from "react";
import useWishlist from "../hooks/useWishlist";
import "../styles/whislist.scss";

export default function Whislist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [items, setItems] = useState([]);
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const results = await Promise.all(
          wishlist.map((id) =>
            fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`)
              .then((res) => res.ok ? res.json() : null)
          )
        );
        setItems(results.filter(Boolean));
      } catch (err) {
        console.error("Feil ved henting av ønskeliste:", err);
      }
    };

    if (wishlist.length > 0) {
      fetchWishlistItems();
    } else {
      setItems([]);
    }
  }, [wishlist]);

  return (
    <main className="whislist-page">
      <h1>Min ønskeliste</h1>
      {items.length === 0 ? (
        <p>Du har ingen lagrede arrangementer.</p>
      ) : (
        <ul className="card-list">
          {items.map((event) => {
            const venue = event._embedded?.venues?.[0];
            const date = event.dates?.start?.localDate || "Ukjent dato";
            const time = event.dates?.start?.localTime || "Ukjent tid";
            const country = venue?.country?.name || "Ukjent land";
            const city = venue?.city?.name || "Ukjent by";
            const venueName = venue?.name || "Ukjent spillested";

            return (
              <li key={event.id} className="card">
                <img src={event.images?.[0]?.url} alt={event.name} />
                <h3>{event.name}</h3>
                <i
                  className="fa-solid fa-heart"
                  onClick={() => toggleWishlist(event.id)}
                ></i>
                <p>{date}</p>
                <p>{time}</p>
                <p>{country}</p>
                <p>{city}</p>
                <p>{venueName}</p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
