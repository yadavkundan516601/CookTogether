import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './state/auth'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import MyRecipesPage from './pages/MyRecipesPage'
import SavedPage from './pages/SavedPage'
import AddRecipePage from './pages/AddRecipePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ThemeProvider } from './state/theme'

function PrivateRoute({ children }) {
    const { token } = useAuth()
    return token ? children : <Navigate to="/login" replace />
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                    <Route path="/my" element={<PrivateRoute><MyRecipesPage /></PrivateRoute>} />
                    <Route path="/saved" element={<PrivateRoute><SavedPage /></PrivateRoute>} />
                    <Route path="/add" element={<PrivateRoute><AddRecipePage /></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </ThemeProvider>
    )
}

