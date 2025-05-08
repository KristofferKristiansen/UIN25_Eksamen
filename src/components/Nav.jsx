import { Link, NavLink } from "react-router-dom";
import '../styling/nav.scss'

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className="navigasjon">
          <li className="billettlyst"><Link to="/">BillettLyst</Link></li>
          
          <li className="underholdning"><NavLink to="/category/musikk">Musikk</NavLink></li>
          <li className="underholdning"><NavLink to="/category/teater">Teater</NavLink></li>
          <li className="underholdning"><NavLink to="/category/sport">Sport</NavLink></li>
          
          <li className="login"><NavLink to="/dashboard">Logg inn</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
