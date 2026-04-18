// Root: guests see landing, logged-in users go to dashboard
// Uses client-side check so cookie name matches exactly what eso-auth.ts sets
import LandingPage from './landing'
export default function Home() {
  return <LandingPage />
}
