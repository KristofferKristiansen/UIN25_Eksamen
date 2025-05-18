export default function Dashboard() {
  return (
    <main>
      <h1>Logg inn</h1>
      <form>
        <section>
          <label>
            Brukernavn:
            <input type="text" name="username" />
          </label>
        </section>
        <section>
          <label>
            Passord:
            <input type="password" name="password" />
          </label>
        </section>
        <button type="submit">Logg inn</button>
      </form>
    </main>
  );
}
