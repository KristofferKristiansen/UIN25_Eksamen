import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWishlist from "../hooks/useWishlist";
import "../styles/categorypage.scss";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const CATEGORY_MAP = {
    musikk: "Music",
    sport: "Sports",
    teater: "Arts & Theatre",
    "teater/show": "Arts & Theatre"
  };

  const [date, setDate] = useState("");
  const [country, setCountry] = useState("NO");
  const [city, setCity] = useState("Oslo");
  const [searchTerm, setSearchTerm] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

  const fetchData = async () => {
    const mappedCategory = CATEGORY_MAP[categoryName?.toLowerCase()];
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=20`;

    if (date) url += `&startDateTime=${date}T00:00:00Z`;
    if (country) url += `&countryCode=${country}`;
    if (city) url += `&city=${city}`;
    if (searchTerm) url += `&keyword=${searchTerm}`;
    if (mappedCategory) url += `&classificationName=${mappedCategory}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API-feil (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const allEvents = data._embedded?.events || [];

      const topEvents = allEvents.slice(0, 5);

      const uniqueAttractions = [
        ...new Map(
          allEvents
            .flatMap((e) => e._embedded?.attractions || [])
            .map((a) => [a.id, a])
        ).values()
      ].slice(0, 5);

      const uniqueVenues = [
        ...new Map(
          allEvents
            .flatMap((e) => e._embedded?.venues || [])
            .map((v) => [v.id, v])
        ).values()
      ].slice(0, 5);

      setAttractions(uniqueAttractions);
      setEvents(topEvents);
      setVenues(uniqueVenues);
    } catch (error) {
      console.error("Feil ved henting av data:", error);
      setAttractions([]);
      setEvents([]);
      setVenues([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  const handleFilter = () => fetchData();
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <main className="category-page">
      <h1>Filtert søk</h1>

      <section className="filters">
        <label>
          Dato:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Land:
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="NO">Norge</option>
            <option value="SE">Sverige</option>
            <option value="DE">Tyskland</option>
            <option value="FR">Frankrike</option>
            <option value="GB">Storbritannia</option>
          </select>
        </label>
        <label>
          By:
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Oslo</option>
            <option>Stockholm</option>
            <option>Berlin</option>
            <option>London</option>
            <option>Paris</option>
          </select>
        </label>
        <button onClick={handleFilter}>Filtrer</button>
      </section>

      <section className="search">
        <h2>Søk</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Søk etter event, attraksjon eller spillested"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>
      </section>

      <article className="attractions">
        <h2>Attraksjoner</h2>
        <ul className="card-list">
          {attractions.length > 0 ? (
            attractions.map((a) => (
              <li key={a.id} className="card">
                <img src={a.images?.[0]?.url} alt={a.name} />
                <h3>{a.name}</h3>
                <i
                  className={`fa-heart ${isInWishlist(a.id) ? "fa-solid" : "fa-regular"}`}
                  onClick={() => toggleWishlist(a.id)}
                  style={{ cursor: "pointer", fontSize: "1.2rem", color: isInWishlist(a.id) ? "red" : "#444" }}
                ></i>
              </li>
            ))
          ) : (
            <p>Ingen attraksjoner funnet.</p>
          )}
        </ul>
      </article>

      <article className="events">
        <h2>Arrangementer</h2>
        <ul className="card-list">
          {events.length > 0 ? (
            events.map((e) => {
              const date = e.dates?.start?.localDate || "Ukjent dato";
              const time = e.dates?.start?.localTime || "Ukjent tid";
              const venue = e._embedded?.venues?.[0];
              const city = venue?.city?.name || "Ukjent by";
              const country = venue?.country?.name || "Ukjent land";
              const venueName = venue?.name || "Ukjent spillested";

              return (
                <li key={e.id} className="card">
                  <img src={e.images?.[0]?.url} alt={e.name} />
                  <h3>{e.name}</h3>
                  <i
                    className={`fa-heart ${isInWishlist(e.id) ? "fa-solid" : "fa-regular"}`}
                    onClick={() => toggleWishlist(e.id)}
                    style={{ cursor: "pointer", fontSize: "1.2rem", color: isInWishlist(e.id) ? "red" : "#444" }}
                  ></i>
                  <p>{date}</p>
                  <p>{time}</p>
                  <p>{country}</p>
                  <p>{city}</p>
                  <p>{venueName}</p>
                </li>
              );
            })
          ) : (
            <p>Ingen arrangementer funnet.</p>
          )}
        </ul>
      </article>

      <article className="venues">
        <h2>Spillesteder</h2>
        <ul className="card-list">
          {venues.length > 0 ? (
            venues.map((v) => (
              <li key={v.id} className="card">
                <img src={v.images?.[0]?.url || "/placeholder.jpg"} alt={v.name} />
                <h3>{v.name}</h3>
                <i
                  className={`fa-heart ${isInWishlist(v.id) ? "fa-solid" : "fa-regular"}`}
                  onClick={() => toggleWishlist(v.id)}
                  style={{ cursor: "pointer", fontSize: "1.2rem", color: isInWishlist(v.id) ? "red" : "#444" }}
                ></i>
              </li>
            ))
          ) : (
            <p>Ingen spillesteder funnet.</p>
          )}
        </ul>
      </article>
    </main>
  );
}
