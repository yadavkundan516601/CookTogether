import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(undefined)

function getInitialTheme() {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const value = useMemo(() => ({ theme, setTheme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}

