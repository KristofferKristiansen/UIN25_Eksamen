import { useState } from "react";
import sanityClient from "../sanityClient";
import "../styles/dashboard.scss"; // Husk å importere stilen

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Påloggingsstatus

  const handleLogin = (e) => {
    e.preventDefault(); // Forhindrer sideoppdatering
    setIsLoggedIn(true); // Endrer status til innlogget
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Tilbakestiller status ved utlogging
  };

  return (
    <main>
      {!isLoggedIn ? (
        <>
          <h1>Logg inn</h1>
          <form onSubmit={handleLogin}>
            <section>
              <label>
                Brukernavn:
                <input type="text" name="username" required />
              </label>
            </section>
            <section>
              <label>
                Passord:
                <input type="password" name="password" required />
              </label>
            </section>
            <button type="submit">Logg inn</button>
          </form>
        </>
      ) : (
        <>
          <h1>Min side</h1>
          <p>Velkommen! Du er nå logget inn.</p>
          <button className="logout" onClick={handleLogout}>Logg ut</button>
        </>
      )}
    </main>
  );
}
