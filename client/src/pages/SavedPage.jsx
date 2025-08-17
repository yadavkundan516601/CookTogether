import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../services/api'
import { useAuth } from '../state/auth'
import RecipeCard from '../components/RecipeCard'

export default function SavedPage() {
    const { token } = useAuth()
    const [recipes, setRecipes] = useState([])
    const load = async () => {
        if (token) setRecipes(await apiGet(`/api/v1/users/me/saved`, token))
    }
    useEffect(() => { load() }, [token])
    const toggleSave = async (id) => {
        if (!token) return
        await apiPost(`/api/v1/recipes/${id}/save`, {}, token)
        setRecipes(prev => prev.filter(r => r.recipe_id !== id))
    }
    return (
        <div className="container">
            <h1>Saved Recipes</h1>
            <div className="grid">
                {recipes.map(r => <RecipeCard key={r.recipe_id} recipe={r} saved onSave={() => toggleSave(r.recipe_id)} />)}
            </div>
        </div>
    )
}

