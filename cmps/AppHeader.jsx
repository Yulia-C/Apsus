const { Link, NavLink } = ReactRouterDOM
// import { ReactComponent as GmailIcon } from '../assets/img/gmail.svg';

export function AppHeader() {

    return <header className="app-header container">
        <Link to="/">
            <img className="apsus-logo" src="assets/img/apsus-logo3.png"/>        
            </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">
                <img className="mail-logo" src="assets/img/gmail.svg" title="mail" />
            </NavLink>
            <NavLink to="/note">
                <img className="note-logo" src="assets/img/keep.svg" title="keep" />
            </NavLink>
        </nav>
    </header>
}
