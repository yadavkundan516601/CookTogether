import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../services/api'
import { useAuth } from '../state/auth'
import RecipeCard from '../components/RecipeCard'
import './HomePage.css'

export default function HomePage() {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [recipes, setRecipes] = useState([])
    const [trending, setTrending] = useState([])
    const [savedIds, setSavedIds] = useState(new Set())
    const { token } = useAuth()

    const fetchList = async () => {
        const data = await apiGet(`/api/v1/recipes?query=${encodeURIComponent(query)}&page=${page}&limit=8`)
        setRecipes(data.recipes)
        setTotal(data.total)
        if (token) {
            try {
                const saved = await apiGet(`/api/v1/users/me/saved`, token)
                setSavedIds(new Set(saved.map(r => r.recipe_id)))
            } catch { }
        } else {
            setSavedIds(new Set())
        }
    }

    useEffect(() => { fetchList() }, [query, page])
    useEffect(() => { (async () => { try { setTrending(await apiGet(`/api/v1/recipes/trending/list?limit=4`)) } catch { } })() }, [])

    const pages = useMemo(() => Math.max(1, Math.ceil(total / 8)), [total])

    const toggleSave = async (id) => {
        if (!token) return
        await apiPost(`/api/v1/recipes/${id}/save`, {}, token)
        setSavedIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id); else next.add(id)
            return next
        })
    }

    return (
        <div className="home">
            <div className="hero">
                <h1>Healthy Cooking Recipes and the right Nutrition.</h1>
                <p>Browse Through Over 650,000 Tasty Recipes.</p>
                <div className="hero__search">
                    <input value={query} onChange={(e) => { setPage(1); setQuery(e.target.value) }} placeholder="Search recipes or ingredients..." />
                    <button className="btn" onClick={fetchList}>Search</button>
                </div>
            </div>
            {trending.length > 0 && !query.trim() && (
                <>
                    <div style={{ padding: '0 18px' }} id="trending">
                        <h2 className="muted" style={{ margin: '6px 0 10px' }}>Trending recipes</h2>
                    </div>
                    <div className="grid">
                        {trending.map(r => (
                            <RecipeCard key={r.recipe_id} recipe={r} saved={savedIds.has(r.recipe_id)} onSave={token ? () => toggleSave(r.recipe_id) : undefined} />
                        ))}
                    </div>
                </>
            )}
            <div style={{ padding: '0 18px', marginTop: (!query.trim() && trending.length) ? 10 : 0 }} id="all">
                <h2 className="muted" style={{ margin: '6px 0 10px' }}>All recipes</h2>
            </div>
            <div className="grid">
                {recipes.map(r => (
                    <RecipeCard key={r.recipe_id} recipe={r} saved={savedIds.has(r.recipe_id)} onSave={token ? () => toggleSave(r.recipe_id) : undefined} />
                ))}
            </div>
            <div className="pagination">
                <button className="btn ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>Page {page} of {pages}</span>
                <button className="btn ghost" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    )
}

