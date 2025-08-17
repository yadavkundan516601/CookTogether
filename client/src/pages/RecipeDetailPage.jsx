import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../services/api'
import { useAuth } from '../state/auth'
import './RecipeDetailPage.css'

export default function RecipeDetailPage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [myRating, setMyRating] = useState(null)
    const { token } = useAuth()

    const load = async () => {
        const r = await apiGet(`/api/v1/recipes/${id}`)
        setRecipe(r)
    }

    useEffect(() => { load() }, [id])

    const rate = async (value) => {
        if (!token || !id) return
        await apiPost(`/api/v1/recipes/${id}/rate`, { rating: value }, token)
        setMyRating(value)
        await load()
    }

    if (!recipe) return null

    return (
        <div className="detail">
            {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="detail__img" />}
            <div className="detail__content">
                <h1>{recipe.title}</h1>
                <p>{recipe.description}</p>
                <div className="detail__meta">
                    <span>⭐ {Number(recipe.average_rating).toFixed(1)} ({recipe.total_ratings})</span>
                    <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} mins</span>
                </div>
                <div className="detail__rate">
                    {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} className={`star ${myRating === n ? 'active' : ''}`} onClick={() => rate(n)}>★</button>
                    ))}
                </div>
                <h3>Ingredients</h3>
                <div className="ingredients">
                    {recipe.ingredients.map((i, idx) => (
                        <span key={idx} className="ingredient">{i}</span>
                    ))}
                </div>
                <h3>Instructions</h3>
                <div className="steps">
                    {recipe.instructions.map((s, idx) => (
                        <div key={idx} className="step">
                            <span className="step__index">{idx + 1}</span>
                            <p className="step__text">{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

