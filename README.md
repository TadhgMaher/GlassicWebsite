# Glassic — beta marketing site

Static front-end only (HTML, CSS, vanilla JS). No build step, no backend.

## Run

Open `index.html` directly in a browser, or serve the folder:

```
cd /Users/tadhg/Desktop/GreenAi/Website
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` – page structure and content
- `styles.css` – design (palette `#F2EFE7 #C8DFDB #66A3BF #3368A0` as CSS variables)
- `app.js` – mobile nav, scroll reveal, active-nav highlight, mock dashboard, placeholder form
- `GlassicLogo.png` – logo (cropped to the leaf via CSS); `favicon.svg` – derived favicon

## Notes

All figures, projects and prices are placeholders. The signup form does not send data. Fonts load from Google Fonts (falls back to system fonts offline). Animations respect `prefers-reduced-motion`.
