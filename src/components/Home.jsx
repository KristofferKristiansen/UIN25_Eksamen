import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import EventCard from "./EventCard";
import MoreEventCards from "./MoreEventCards";
import "../styles/home.scss";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [cityevents, setCityevents] = useState([]);

  const cities = ["Oslo", "Stockholm", "Berlin", "London", "Paris"];

  useEffect(() => {
    const fetchEventIdsFromSanity = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "event" && defined(apiId)]{title, apiId}`);
        return data;
      } catch (error) {
        console.error("Feil ved henting av event-ID-er fra Sanity:", error);
        return [];
      }
    };

    const fetchEventsFromTicketmaster = async (sanityEvents) => {
      const apiKey = "V1AMlgj055WhvVHBvdjBPdaeOn7vZrRZ";

      try {
        const promises = sanityEvents.map((sanityEvent) =>
          fetch(`https://app.ticketmaster.com/discovery/v2/events/${sanityEvent.apiId}.json?apikey=${apiKey}`)
            .then((res) => {
              if (!res.ok) throw new Error(`Feil for ID ${sanityEvent.apiId}`);
              return res.json().then((tmEvent) => ({
                ...tmEvent,
                customTitle: sanityEvent.title,
              }));
            })
        );

        const results = await Promise.all(promises);
        setEvents(results);
        filterEventsByCity(results, selectedCity);
      } catch (error) {
        console.error("Feil ved henting av eventdata fra Ticketmaster:", error);
      }
    };

    const loadEvents = async () => {
      const sanityEvents = await fetchEventIdsFromSanity();
      if (sanityEvents.length > 0) {
        fetchEventsFromTicketmaster(sanityEvents);
      }
    };

    loadEvents();
  }, []);

  const handleClick = (city) => {
    setSelectedCity(city);
    filterEventsByCity(events, city);
  };

  const filterEventsByCity = (allEvents, city) => {
    const filtered = allEvents.filter((event) =>
      event._embedded?.venues?.[0]?.city?.name === city
    );
    setCityevents(filtered);
  };

  return (
    <main className="home">
      <Nav />
      <h1>Sommerens Festivaler!</h1>

      {/* Alle eventer som skal vises på toppen*/}
      <article className="event-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </article>

      {/* Filtrerbare events per by, som vises nede (ikke noe knapper) */}
      <article className="cityevents">
        <h3>Hva skjer i verdens storbyer!</h3>
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
        <ul className="event-list">
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
