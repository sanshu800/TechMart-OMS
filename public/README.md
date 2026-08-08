# TechMart OMS Frontend

Drop these three files into `public/` in the TechMart OMS backend.

## API used

- GET /health
- GET /orders
- GET /orders/:orderId
- POST /orders
- PUT /orders/:orderId
- PUT /orders/:orderId/status

The UI keeps the backend as the source of truth for order status transitions.

## Integrate with Express

In `server.js`, add:

```js
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
```

Put this before the API routes. If you want the HTML dashboard at `/`, remove or replace the existing `app.get("/")` text response so `index.html` can be served.

Then:

```bash
git add .
git commit -m "Add TechMart OMS frontend"
git push origin main
```

Render should redeploy from GitHub.

The frontend uses same-origin `/orders` and `/health`, so no Render URL needs to be hard-coded.

Never put `.env`, database credentials, API keys, or secrets inside `public/`.
