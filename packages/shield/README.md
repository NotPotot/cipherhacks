# @mirageshield/mirage

**AI breach defense for any website.** Block scrapers, bots, headless browsers, and AI-driven attacks with a single install.

Mirage Shield works in two layers at once:

- **Server-side middleware** (Next.js / Express) fingerprints every request, applies AI-aware rate limiting, and blocks threats before they reach your app.
- **Client-side runtime** (React) masks sensitive form fields from headless scrapers, injects honeypots, detects automation frameworks, and tracks behavior to distinguish humans from bots.

[![npm version](https://img.shields.io/npm/v/@mirageshield/mirage.svg)](https://www.npmjs.com/package/@mirageshield/mirage)
[![license](https://img.shields.io/npm/l/@mirageshield/mirage.svg)](https://github.com/NotPotot/cipherhacks/blob/main/LICENSE)

---

## Install

```bash
npm install @mirageshield/mirage
```

Then run the setup wizard from your project root:

```bash
npx mirage
```

The CLI auto-detects your framework (Next.js, Express, Hono, or plain React) and generates the right configuration files for you. If you'd rather wire it up manually, see the quick-start examples below.

---

## Features

| Layer | Defense |
|---|---|
| **Bot Detection** | User-agent analysis, header anomaly detection, payload inspection for prompt injection and SQL injection |
| **Traffic Analysis** | AI-aware rate limiting with repetition tracking and adaptive slowdown |
| **Content Security** | Auto-generated CSP headers per route sensitivity level |
| **DOM Shield** | Masks `data-sensitive` input values from headless scrapers; real values surface only during genuine user interaction |
| **Honeypot Fields** | Invisible form fields injected into your forms; bots that fill them are flagged and blocked |
| **Headless Detection** | Identifies Playwright, Puppeteer, Selenium, and other automation frameworks via WebGL, canvas fingerprinting, CDP flags, and behavioral signals |
| **Proof of Work** | Optional client-side challenge for suspicious sessions |
| **Behavior Tracking** | Monitors mouse movement and keystroke cadence to separate humans from bots |
| **Event Logging** | Built-in event store for security auditing and dashboards |

---

## Quick Start

### Next.js

Create `middleware.ts` at your project root (or under `src/`):

```ts
import { createMirageMiddleware } from '@mirageshield/mirage/nextjs'

export const middleware = createMirageMiddleware({
  onDetection: 'block',
  blockPage: '/blocked',
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
```

### Express

```ts
import express from 'express'
import { mirageExpress } from '@mirageshield/mirage/express'

const app = express()

app.use(mirageExpress({
  onDetection: 'block',
  blockPage: '/blocked',
}))
```

### React (client-side)

Wrap your app with `<MirageProvider>` to enable DOM shielding, honeypots, headless detection, and behavior tracking:

```tsx
import { MirageProvider } from '@mirageshield/mirage/react'

function App() {
  return (
    <MirageProvider
      protectSelectors={['[data-sensitive]', 'input[type="password"]']}
      honeypotFields={true}
      behaviorTracking={true}
    >
      <YourApp />
    </MirageProvider>
  )
}
```

Mark any input you want shielded from scrapers with `data-sensitive`:

```tsx
<input name="card" data-sensitive />
```

### Plain HTML (no framework)

Drop the global client bundle into any page:

```html
<script src="https://unpkg.com/@mirageshield/mirage/dist/client.global.js"></script>
<script>
  window.Mirage.init({
    protectSelectors: ['[data-sensitive]', 'input[type="password"]'],
    honeypotFields: true,
    behaviorTracking: true,
  })
</script>
```

---

## Configuration

```ts
createMirageMiddleware({
  // Per-route sensitivity. Globs are matched in order; '/*' is the fallback.
  routes: {
    '/checkout': 'maximum',
    '/account': 'high',
    '/*': 'standard',
  },

  // What to do when a threat is detected.
  onDetection: 'block', // 'block' | 'challenge' | 'monitor'

  // Where to redirect blocked requests (HTML responses only).
  blockPage: '/blocked',

  // AI-aware rate limiting.
  rateLimit: {
    windowMs: 60000,          // 1-minute window
    maxRequests: 60,          // max requests per window per fingerprint
    aiPatternMultiplier: 0.5, // stricter limits for AI-like traffic patterns
  },

  // Optional: callback fired on every detection event.
  onEvent: (event) => {
    console.log('[mirage]', event.type, event.reason, event.fingerprint)
  },
})
```

**Route sensitivity levels** scale every threshold:

| Level | Multiplier | Use for |
|---|---|---|
| `standard` | 1.0x | Public pages, marketing, blog |
| `high` | 1.2x | Account, profile, settings |
| `maximum` | 1.5x | Checkout, auth, payment, admin |

**Detection modes:**

- `block` - return 403 / redirect to `blockPage`
- `challenge` - issue a proof-of-work challenge before allowing the request
- `monitor` - log only, do not block

---

## Architecture

```
Request -> Next.js / Express middleware
              |
              +-- Bot detection (UA, headers, payload)
              +-- Rate limiter (AI-aware, repetition tracking)
              +-- Fingerprint scoring
                      |
              +-------+-------+
              |               |
           Allow           Block / Challenge
              |               |
        Response +      Redirect / 429
        CSP headers
              |
        Client loads
              |
        +-----+------+
        |            |
    DOM Shield   Honeypots
    Headless     Behavior
    Detection    Tracking
```

---

## Subpath Exports

| Import | Use in |
|---|---|
| `@mirageshield/mirage` | Shared core (types, utilities) |
| `@mirageshield/mirage/nextjs` | Next.js middleware helpers |
| `@mirageshield/mirage/express` | Express middleware helpers |
| `@mirageshield/mirage/react` | React provider and hooks |
| `@mirageshield/mirage/client` | Global UMD bundle for plain HTML |

---

## CLI

```bash
npx mirage
```

The setup wizard will:

1. Detect your framework from `package.json`.
2. Generate `middleware.ts` (Next.js) or print the Express snippet to copy.
3. Create a `/blocked` page if one doesn't exist.
4. Wire up a security events API route (Next.js).

Re-run it anytime to regenerate missing config files; existing files are left untouched.

---

## Requirements

- Node.js 18 or newer
- One of: Next.js 14+, Express 4+, or React 18+ (all optional peer dependencies - install only what you use)

---

## License

MIT

---

## Links

- [GitHub repository](https://github.com/NotPotot/cipherhacks)
- [Report an issue](https://github.com/NotPotot/cipherhacks/issues)
- [npm package](https://www.npmjs.com/package/@mirageshield/mirage)
