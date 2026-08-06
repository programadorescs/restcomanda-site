# Rest Comanda — Sitio Web Promocional

Landing page oficial de **Rest Comanda – POS Restaurante**, publicada con GitHub Pages.

🌐 **URL del sitio:** https://programadorescs.github.io/restcomanda-site/

> **Origen del contenido:** este repositorio es la **publicación** del sitio.
> La fuente de verdad es la carpeta `website/` del repositorio de la app
> (`programadorescs/RestComanda`). Cada vez que se actualice la app, se copian
> los archivos de `website/` aquí y se hace push.

## Estructura

```
restcomanda-site/
├── index.html              # Landing page (una sola página)
├── css/styles.css          # Estilos custom (Tailwind CDN + personalización)
├── js/main.js              # Menú móvil, scroll reveal, contadores, galería, FAQ
├── assets/
│   ├── screenshots/        # 8 capturas de la app en WebP (optimizadas)
│   ├── app-icon-512.png    # Icono oficial de la app
│   ├── favicon.png         # Favicon 32x32
│   ├── apple-touch-icon.png
│   └── icon-192/512.png    # Iconos para web manifest
├── site.webmanifest       # Web manifest (color de tema, iconos)
├── robots.txt
├── sitemap.xml
├── .github/workflows/
│   └── deploy-pages.yml   # Publica el sitio en GitHub Pages (repo público)
└── scripts/
    └── optimize-screenshots.cjs  # Script de optimización de imágenes (Node + sharp)
```

## Contacto

- Correo: programadorescs@gmail.com
- Sitio del desarrollador: https://programadorescs.com
