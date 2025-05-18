import "../styles/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Data levert av{" "}
        <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer">
          Ticketmaster Discovery API
        </a>
      </p>
    </footer>
  );
}
