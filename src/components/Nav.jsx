export default function Nav() {
    return(
        <nav>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><NavLink to="/category/musikk">Musikk</NavLink></li>
                <li><NavLink to="/category/teater">Teater</NavLink></li>
                <li><NavLink to="/category/sport">Sport</NavLink></li>
            </ul>
        </nav>
    );
}