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

## Cómo publicar (primera vez)

Este repositorio es **público**, por lo que GitHub Pages funciona con el plan gratuito.

1. Crea el repositorio en GitHub (web): **New repository** →
   nombre `restcomanda-site` → **Public** → Create.
2. Sube el contenido de esta carpeta (los archivos en la **raíz**, no la carpeta completa):

   ```bash
   cd D:\Proyectos_Android\SUPABASE\RestComanda-website
   git init
   git add .
   git commit -m "Landing page de Rest Comanda"
   git branch -M main
   git remote add origin https://github.com/programadorescs/restcomanda-site.git
   git push -u origin main
   ```

3. El workflow se ejecuta solo. En **Settings → Pages** confirma que el **Source**
   quedó en **GitHub Actions** (el workflow con `enablement: true` lo activa solo;
   si no, selecciónalo manualmente y vuelve a correr el workflow desde Actions).
4. El sitio queda en `https://programadorescs.github.io/restcomanda-site/`.

## Desplegar manualmente

1. Ve a la pestaña **Actions** del repositorio.
2. Selecciona el workflow **Deploy website to GitHub Pages**.
3. Clic en **Run workflow** → **Run workflow**.

## Redirigir a un dominio propio (opcional)

En **Settings → Pages → Custom domain**, agrega tu dominio (ej. `restcomanda.com`)
y configura el CNAME en tu proveedor DNS.

## Cómo probar en local

```bash
npx serve
```

Abre `http://localhost:3000` en el navegador.

## Cómo actualizar el contenido

1. Edita los archivos en `website/` del repo de la app (`programadorescs/RestComanda`).
2. Copia los cambios a este repositorio y haz push:

   ```bash
   cd D:\Proyectos_Android\SUPABASE\RestComanda-website
   xcopy /E /Y D:\Proyectos_Android\SUPABASE\RestComanda\website\* .
   git add .
   git commit -m "Actualización del sitio"
   git push
   ```

3. El workflow despliega automáticamente.

### Actualizar capturas de la app

Coloca los PNG nuevos (`rc-NN.png`) en `app/src/main/assets/` del repo de la app
y ejecuta desde este repositorio:

```bash
npm install sharp --no-save
node scripts/optimize-screenshots.cjs D:\Proyectos_Android\SUPABASE\RestComanda\app\src\main\assets
```

## Contacto

- Correo: programadorescs@gmail.com
- Teléfono / WhatsApp: +51 956 414 993
- Sitio del desarrollador: https://programadorescs.com
