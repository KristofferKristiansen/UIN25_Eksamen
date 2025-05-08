import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Hjem</Link></li>
          <li><NavLink to="/category/musikk">Musikk</NavLink></li>
          <li><NavLink to="/category/teater">Teater</NavLink></li>
          <li><NavLink to="/category/sport">Sport</NavLink></li>
          <li><NavLink to="/dashboard">Logg inn</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
