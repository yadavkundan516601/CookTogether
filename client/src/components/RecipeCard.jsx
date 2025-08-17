import { Link } from 'react-router-dom'
import { useState } from 'react'
import './RecipeCard.css'

export default function RecipeCard({ recipe, onSave, saved }) {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [imgError, setImgError] = useState(false)
    return (
        <div className="card">
            {recipe.image_url && !imgError ? (
                <>
                    {!imgLoaded && <div className="card__img skeleton-img" aria-hidden="true" />}
                    <img
                        className="card__img"
                        style={{ display: imgLoaded ? 'block' : 'none' }}
                        src={recipe.image_url}
                        alt={recipe.title}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                </>
            ) : (
                <div className="card__img placeholder" aria-hidden="true">
                    <span className="placeholder__emoji" role="img" aria-label="food">🍲</span>
                </div>
            )}
            <div className="card__body">
                <h3 className="card__title"><Link to={`/recipes/${recipe.recipe_id}`}>{recipe.title}</Link></h3>
                {recipe.description && <p className="card__desc">{recipe.description}</p>}
                <div className="card__meta">
                    <span>⭐ {Number(recipe.average_rating).toFixed(1)} ({recipe.total_ratings})</span>
                    {(recipe.prep_time || recipe.cook_time) && (
                        <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} mins</span>
                    )}
                </div>
                {onSave && (
                    <div className="card__actions">
                        <button className={`btn save ${saved ? 'saved' : ''}`} onClick={onSave}>
                            {saved ? 'Unsave' : 'Save'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

