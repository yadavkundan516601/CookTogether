import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/auth'
import { useTheme } from '../state/theme'
import './Navbar.css'

export default function Navbar() {
    const { token, logout } = useAuth()
    const { theme, toggle } = useTheme()
    const nav = useNavigate()
    const onLogout = () => { logout(); nav('/') }
    return (
        <header className="nav">
            <div className="nav__brand">CookTogether</div>
            <nav className="nav__links">
                <Link to="/">Home</Link>
                <Link to="/add">Add Recipe</Link>
                <Link to="/saved">Saved</Link>
                <Link to="/my">My Recipes</Link>
            </nav>
            <div className="nav__auth">
                <button className="icon-btn" onClick={toggle} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
                    {theme === 'dark' ? (
                        // Sun icon
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    ) : (
                        // Moon icon
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                    )}
                </button>
                {token ? (
                    <button className="btn" onClick={onLogout}>Logout</button>
                ) : (
                    <>
                        <Link className="btn ghost" to="/login">Login</Link>
                        <Link className="btn" to="/register">Sign Up</Link>
                    </>
                )}
            </div>
        </header>
    )
}

