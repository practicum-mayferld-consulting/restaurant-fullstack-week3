import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

// Root component — manages global auth state and passes it down
export default function App() {
  const [user, setUser] = useState(null)          // null = not logged in
  const [authLoading, setAuthLoading] = useState(true)  // true while checking session
  const [showAuth, setShowAuth] = useState(false)  // controls the modal

  // On first load, check if the user has an active session (survives page refresh)
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
      .catch(() => {}) // network error — stay logged out
      .finally(() => setAuthLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  return (
    <>
      <Header
        user={user}
        authLoading={authLoading}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
      />

      <main>
        <Hero onOpenAuth={() => setShowAuth(true)} />
        <About />
        <Menu />
        <Reservation user={user} />
      </main>

      <Footer />

      {/* Auth modal — shown when user clicks Sign In / Sign Up */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuthSuccess={(u) => {
            setUser(u)
            setShowAuth(false)
          }}
        />
      )}
    </>
  )
}
