import { NavLink } from 'react-router-dom'
import styles from './TabBar.module.css'

const tabs = [
  {
    to: '/',
    label: 'Сегодня',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M2 12h4l2-6 4 12 2-6h8" fill="none"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'История',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="3" y="13" width="4" height="7" rx="1.5" fill={active ? 'var(--primary)' : 'var(--text-muted)'}/>
        <rect x="10" y="8" width="4" height="12" rx="1.5" fill={active ? 'var(--primary)' : 'var(--text-muted)'}/>
        <rect x="17" y="4" width="4" height="16" rx="1.5" fill={active ? 'var(--primary)' : 'var(--text-muted)'}/>
      </svg>
    ),
  },
  {
    to: '/reminders',
    label: 'Напомин.',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 9a6 6 0 0112 0v4l1.5 3H4.5L6 13z" fill="none"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M10 19a2 2 0 004 0" fill="none"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Профиль',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.5" fill="none"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.8"/>
        <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" fill="none"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function TabBar() {
  return (
    <nav className={styles.tabbar}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={styles.tab}
        >
          {({ isActive }) => (
            <>
              {tab.icon(isActive)}
              <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}