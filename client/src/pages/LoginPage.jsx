import { useState } from 'react'
import { useAuth } from '../state/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
    const { login } = useAuth()
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try { await login(email, password); nav('/') } catch (e) { setError(e.message) }
    }

    return (
        <div className="container narrow">
            <h1>Login</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
                {error && <div className="error">{error}</div>}
                <button className="btn" type="submit">Login</button>
                <p className="muted">No account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}

