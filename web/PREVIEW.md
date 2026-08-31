# Preview OTHO locally

From this folder:

```bash
python3 -m http.server 8765
```

Open **http://localhost:8765/** in your browser.

## What changed (Cursor polish pass)

- **Navigation** — trimmed to Buy / Learn groups; secondary links under **More**; **Leads** moved to footer as internal demo only
- **Theme** — defaults to **light**; toggle (☀/☾) in the nav; choice saved in `localStorage`
- **Compare** — styled project pickers with labels
- **Accessibility** — skip-to-content link
- **Visual** — subtle 5px radius on cards, buttons, inputs
- **`site/`** — redirects to `web/` so only one prototype ships

Deploy `web/` as-is to Vercel (see `vercel.json`).
