'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Home link */}
        <Link href="/" className="nav-logo">
          RecipeShare
        </Link>

        {/* Future nav links */}
        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/new"
            className={`nav-link ${pathname === '/new' ? 'active' : ''}`}
          >
            Add Recipe
          </Link>
        </div>
      </div>
    </nav>
  )
}