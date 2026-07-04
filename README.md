# Health App — Frontend

Telegram Mini App for tracking blood pressure, pulse and medication reminders.

🤖 Bot: [@margoheal_bot](https://t.me/margoheal_bot)  
📱 App: [t.me/margoheal_bot/health](https://t.me/margoheal_bot/health)

## Stack

- **Vite + React + TypeScript**
- **react-router v7** — routing
- **@telegram-apps/sdk-react v3** — Telegram SDK
- **@tanstack/react-query** — data fetching and caching

## Features

- 📊 Blood pressure and pulse tracking
- 📈 Weekly trend chart
- 💊 Medication reminders with confirmation
- 📄 PDF export via Telegram bot
- 🌙 Dark/light theme support
- 📳 Haptic feedback

## Setup

```bash
npm install
npm run dev
```

## Environment

```env
VITE_API_URL=https://your-api.com/api
```

## Deploy

```bash
npm run build
# Upload dist/ to hosting
```

## Development

Mock Telegram environment is enabled automatically in dev mode.
Production requires opening via Telegram: [t.me/margoheal_bot/health](https://t.me/margoheal_bot/health)