import { useEffect, useState } from 'react'
import { apiGet } from '../services/api'
import { useAuth } from '../state/auth'
import RecipeCard from '../components/RecipeCard'

export default function MyRecipesPage() {
    const { token } = useAuth()
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        (async () => {
            if (token) setRecipes(await apiGet(`/api/v1/users/me/recipes`, token))
        })()
    }, [token])
    return (
        <div className="container">
            <h1>My Recipes</h1>
            <div className="grid">
                {recipes.map(r => <RecipeCard key={r.recipe_id} recipe={r} />)}
            </div>
        </div>
    )
}

