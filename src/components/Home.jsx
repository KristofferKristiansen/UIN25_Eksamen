import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import EventCard from "./EventCard";
import MoreEventCards from "./MoreEventCards";
import "../styles/home.scss";

export default function Home() {
  const [events, setEvents] = useState([]); // Sommerens festivaler
  const [cityevents, setCityevents] = useState([]); // Eventer per valgt by
  const [selectedCity, setSelectedCity] = useState("Oslo");

  const cities = ["Oslo", "Stockholm", "Berlin", "London", "Paris"];
  const apiKey = "V1AMlgj055WhvVHBvdjBPdaeOn7vZrRZ";

  // Hent utvalgte festivaler + sosiale lenker
  useEffect(() => {
    const fetchSelectedFestivals = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[
            _type == "event" &&
            defined(apiId) &&
            (
              title match "findings festival" ||
              title match "tons of rock" ||
              title match "skeikampenfestivalen" ||
              title match "neon festival"
            )
          ]{
            title,
            apiId,
            socialLinks
          }
        `);

        const promises = data.map((festival) =>
          fetch(`https://app.ticketmaster.com/discovery/v2/events/${festival.apiId}.json?apikey=${apiKey}`)
            .then((res) => {
              if (!res.ok) {
                console.error(`Feil ved henting av: ${festival.title} (ID: ${festival.apiId})`);
                return null;
              }
              return res.json().then((tmEvent) => ({
                ...tmEvent,
                customTitle: festival.title,
                socialLinks: festival.socialLinks || null,
              }));
            })
        );

        const results = await Promise.all(promises);
        setEvents(results.filter(Boolean));
      } catch (error) {
        console.error("Feil ved henting av utvalgte festivaler:", error);
      }
    };

    fetchSelectedFestivals();
  }, []);

  // Hent eventer per valgt by
  useEffect(() => {
    const fetchEventsByCity = async (city) => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&size=10`
        );
        const data = await response.json();
        const events = data._embedded?.events || [];
        setCityevents(events);
      } catch (error) {
        console.error("Feil ved henting av eventer for byen:", city, error);
      }
    };

    fetchEventsByCity(selectedCity);
  }, [selectedCity]);

  const handleClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <main className="home">
      <h1>Sommerens Festivaler</h1>
      <article className="eventlist">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </article>

      <article className="cityevents">
        <h3>Hva skjer i verdens storbyer</h3>
        <ul className="citybtns">
          {cities.map((city) => (
            <li key={city}>
              <button className="citybtn" onClick={() => handleClick(city)}>
                {city}
              </button>
            </li>
          ))}
        </ul>

        <h3 className="selectedcity">Dette kan du oppleve i: {selectedCity}</h3>
        <ul className="eventlist">
          {cityevents.map((event) => (
            <li key={event.id}>
              <MoreEventCards event={event} />
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
