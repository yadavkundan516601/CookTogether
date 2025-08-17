import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')
    }, [token])

    const login = async (email, password) => {
        const res = await fetch('/api/v1/auth/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.message || 'Login failed')
        setToken(json.data.token)
        setUser({ name: email.split('@')[0], email })
    }

    const register = async (name, email, password) => {
        const res = await fetch('/api/v1/auth/register', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        if (!res.ok) {
            const json = await res.json()
            throw new Error(json.message || 'Registration failed')
        }
        await login(email, password)
    }

    const logout = () => { setToken(null); setUser(null) }

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

