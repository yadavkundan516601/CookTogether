import { useState } from 'react'
import { apiPost } from '../services/api'
import { useAuth } from '../state/auth'
import { useNavigate } from 'react-router-dom'

export default function AddRecipePage() {
    const { token } = useAuth()
    const nav = useNavigate()
    const [form, setForm] = useState({
        title: '', description: '', image_url: '', prep_time: '', cook_time: '', ingredients: '', instructions: ''
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!token) return
        const payload = {
            title: form.title,
            description: form.description || undefined,
            image_url: form.image_url || undefined,
            prep_time: form.prep_time ? Number(form.prep_time) : undefined,
            cook_time: form.cook_time ? Number(form.cook_time) : undefined,
            ingredients: form.ingredients.split('\n').map(s => s.trim()).filter(Boolean),
            instructions: form.instructions.split('\n').map(s => s.trim()).filter(Boolean),
        }
        await apiPost('/api/v1/recipes', payload, token)
        nav(`/`)
    }

    const bind = (k) => ({
        value: form[k],
        onChange: (e) => setForm({ ...form, [k]: e.target.value })
    })

    return (
        <div className="container narrow">
            <h1>Add Recipe</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Title<input required {...bind('title')} /></label>
                <label>Description<textarea rows={3} {...bind('description')} /></label>
                <label>Image URL<input {...bind('image_url')} /></label>
                <div className="form__row">
                    <label>Prep Time (mins)
                        <input inputMode="numeric" pattern="[0-9]*" type="text"
                            placeholder="e.g. 15" min={0}
                            value={form.prep_time}
                            onChange={(e) => {
                                const v = e.target.value.replace(/[^0-9]/g, '')
                                setForm({ ...form, prep_time: v })
                            }} />
                    </label>
                    <label>Cook Time (mins)
                        <input inputMode="numeric" pattern="[0-9]*" type="text"
                            placeholder="e.g. 30" min={0}
                            value={form.cook_time}
                            onChange={(e) => {
                                const v = e.target.value.replace(/[^0-9]/g, '')
                                setForm({ ...form, cook_time: v })
                            }} />
                    </label>
                </div>
                <label>Ingredients (one per line)<textarea rows={6} {...bind('ingredients')} /></label>
                <label>Instructions (one per line)<textarea rows={6} {...bind('instructions')} /></label>
                <button className="btn" type="submit">Create</button>
            </form>
        </div>
    )
}

