export default function Dashboard() {
    return (
      <div>
        <h1>Logg inn</h1>
        <form>
          <label>
            Brukernavn:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Passord:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Logg inn</button>
        </form>
      </div>
    );
  }
  