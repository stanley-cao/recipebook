'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useDisplayName } from '@/app/name-context'
import { possessive } from '@/lib/displayName'
import NameDialog from '@/app/components/NameDialog'

function IconHome(){return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
function IconAdd(){return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>)}

export default function Sidebar() {
  const pathname = usePathname()
  const { name, ready } = useDisplayName()
  const [showDialog, setShowDialog] = useState(false)
  const brand = ready && name ? `${possessive(name)} Recipebook` : 'Recipebook'

  const items = [
    { href: '/', label: 'Home', icon: <IconHome/> },
    { href: '/new', label: 'Add Recipe', icon: <IconAdd/> },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <Link href="/" className="brand">
          <span className="brand-dot" /> {brand}
        </Link>

        <nav className="nav">
          {items.map(it => (
            <Link key={it.href} href={it.href} className={`nav-item ${pathname === it.href ? 'active' : ''}`}>
              <span className="icon">{it.icon}</span>
              <span className="label">{it.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="muted" style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {ready && name ? `Hi, ${name}` : 'Welcome'}
          </div>
          <button className="btn" onClick={() => setShowDialog(true)}>Edit name</button>
        </div>
      </div>
      <NameDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </aside>
  )
}