import { useState } from 'react'
import { useAuth } from '../state/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
    const { register } = useAuth()
    const nav = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try { await register(name, email, password); nav('/') } catch (e) { setError(e.message) }
    }

    return (
        <div className="container narrow">
            <h1>Sign Up</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Name<input required value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
                {error && <div className="error">{error}</div>}
                <button className="btn" type="submit">Create account</button>
                <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

