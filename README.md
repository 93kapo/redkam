# REDKAM — Cinema Portfolio

Portafolio audiovisual inmersivo de REDKAM para aftermovies, documental, fotografía, FPV y drone. El proyecto incluye transiciones, videos optimizados para web, navegación en español/inglés y diseño adaptable para móvil y escritorio.

## Requisitos

- Node.js 22.13 o superior
- pnpm 11

## Ejecutar localmente

```bash
pnpm install
pnpm dev
```

Abre la dirección local que aparece en la terminal.

## Verificar la versión final

```bash
pnpm build
pnpm test
```

## Subir a GitHub

Descomprime el ZIP, abre una terminal dentro de la carpeta `redkam-cinema-portfolio` y ejecuta:

```bash
git init
git add .
git commit -m "Publica portafolio REDKAM"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Reemplaza `TU-USUARIO` y `TU-REPOSITORIO` por los datos de tu cuenta. También puedes arrastrar el contenido de la carpeta a un repositorio desde GitHub Desktop.

## Estructura principal

- `app/page.tsx`: contenido, proyectos e interacciones.
- `app/globals.css`: dirección visual, animaciones y diseño adaptable.
- `public/assets/`: imágenes y videos del portafolio.
- `public/og.png`: imagen que aparece al compartir el enlace.
- `.openai/hosting.json`: configuración del proyecto publicado con Sites.

Los videos añadidos recientemente ya están optimizados y cada archivo está por debajo de 20 MB. No hace falta incluir los archivos originales de más de 190 MB ni los recursos antiguos de Domino’s.

El ZIP se debe descomprimir antes de subir el proyecto. Consulta `SUBIR-A-GITHUB.md` para ver el proceso recomendado.

## Tecnología

El sitio usa React, Next.js y vinext, con salida compatible con Cloudflare Workers y OpenAI Sites. No necesita variables de entorno ni base de datos para mostrar el portafolio.
