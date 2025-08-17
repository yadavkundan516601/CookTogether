export async function apiGet(path, token) {
    const res = await fetch(path, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Request failed')
    return json.data
}

export async function apiPost(path, body, token) {
    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Request failed')
    return json.data
}

