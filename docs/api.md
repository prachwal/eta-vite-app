Aby dodać worker z serverem API do swojej konfiguracji Vercel, masz kilka opcji. Oto najlepsze podejścia:

## Opcja 1: Serverless Functions (Zalecana)

Dodaj funkcje API w folderze `/api`:

**Struktura projektu:**
```
/
├── api/
│   ├── hello.js          # GET /api/hello
│   ├── users.js          # GET /api/users
│   └── posts/
│       └── [id].js       # GET /api/posts/123
├── src/
├── dist/
└── vercel.json
```

**Zaktualizowany vercel.json:**
```json
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "dist"
            }
        },
        {
            "src": "api/**/*.js",
            "use": "@vercel/node"
        }
    ],
    "rewrites": [
        {
            "source": "/api/(.*)",
            "destination": "/api/$1"
        },
        {
            "source": "/assets/(.*)",
            "destination": "/assets/$1"
        },
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

**Przykład funkcji API (`/api/hello.js`):**
```javascript
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from API!' });
    } else if (req.method === 'POST') {
        const { name } = req.body;
        res.status(200).json({ message: `Hello ${name}!` });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
```

## Opcja 2: Edge Functions (Dla lepszej wydajności)

```json
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "dist"
            }
        }
    ],
    "functions": {
        "api/edge-hello.js": {
            "runtime": "edge"
        }
    },
    "rewrites": [
        {
            "source": "/api/(.*)",
            "destination": "/api/$1"
        },
        {
            "source": "/assets/(.*)",
            "destination": "/assets/$1"
        },
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

**Edge Function (`/api/edge-hello.js`):**
```javascript
export const config = {
    runtime: 'edge',
}

export default async function handler(req) {
    const url = new URL(req.url);
    
    return new Response(JSON.stringify({
        message: 'Hello from Edge!',
        path: url.pathname
    }), {
        headers: {
            'content-type': 'application/json',
        },
    });
}
```

## Opcja 3: Express.js Server jako Serverless Function

**Struktura:**
```
/api/
└── server.js    # Cały Express server w jednym pliku
```

**vercel.json:**
```json
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "dist"
            }
        },
        {
            "src": "api/server.js",
            "use": "@vercel/node"
        }
    ],
    "rewrites": [
        {
            "source": "/api/(.*)",
            "destination": "/api/server"
        },
        {
            "source": "/assets/(.*)",
            "destination": "/assets/$1"
        },
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

**Express server (`/api/server.js`):**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
    res.json({ id: 1, name });
});

// Export the Express API
module.exports = app;
```

## Które podejście wybrać?

- **Serverless Functions** - najlepsze dla prostych API endpoints
- **Edge Functions** - najszybsze, globalna dystrybucja
- **Express Server** - jeśli masz już gotowy Express kod
