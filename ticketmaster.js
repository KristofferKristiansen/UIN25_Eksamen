const API_KEY = "V1AMlgj055WhvVHBvdjBPdaeOn7vZrRZ";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export const fetchEventById = async (apiId) => {
  try {
    const res = await fetch(`${BASE_URL}/events/${apiId}.json?apikey=${API_KEY}`);
    if (!res.ok) throw new Error(`Feil ved henting av event med ID: ${apiId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetchEventById-feil:", error);
    return null;
  }
};

export const fetchEventsByCity = async (city, size = 10) => {
  try {
    const res = await fetch(
      `${BASE_URL}/events.json?apikey=${API_KEY}&city=${city}&size=${size}`
    );
    if (!res.ok) throw new Error(`Feil ved henting av eventer i: ${city}`);
    const data = await res.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("fetchEventsByCity-feil:", error);
    return [];
  }
};
