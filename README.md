# REDKAM — Portafolio audiovisual

Portafolio audiovisual independiente de REDKAM para aftermovies, documental, fotografía, FPV y drone. Incluye navegación en español/inglés, miniclips silenciosos desde YouTube, diseño adaptable y contacto directo por WhatsApp.

Esta versión no contiene autenticación, lectura del correo de visitantes, conectores ni base de datos.

## Requisitos

- Node.js 22.13 o superior
- pnpm 11

## Ejecutar localmente

```bash
pnpm install
pnpm dev
```

Abre la dirección local que aparece en la terminal.

## Crear la versión estática

```bash
pnpm build
```

El resultado estático se genera en la carpeta `out`.

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
- `app/youtube-links.ts`: único archivo donde se pegan los enlaces de YouTube.
- `public/assets/`: recursos visuales ligeros del diseño general.
- `public/og.png`: imagen que aparece al compartir el enlace.
- `next.config.ts`: configuración para generar una versión estática.

No hay archivos `.mp4` ni `.webm` dentro del proyecto. Todo el material audiovisual se reproduce desde YouTube.

## Agregar los enlaces de YouTube

Abre `app/youtube-links.ts` y pega cada enlace entre las comillas correspondientes. La página acepta enlaces normales de YouTube, `youtu.be`, Shorts y transmisiones. Cada trabajo mostrará automáticamente un miniclip silencioso de aproximadamente seis segundos, repetido en bucle. Al hacer clic, se abrirá el video completo directamente en YouTube. Si un enlace todavía está vacío, aparece un bloque neutral indicando que el enlace está pendiente; no se usa una imagen como preview.

Consulta `SUBIR-A-GITHUB.md` para ver el proceso recomendado.

## Contacto

Los botones de cotización abren una conversación de WhatsApp con el número `+502 3405 6149` y un mensaje inicial listo para enviar.

## Tecnología

El sitio usa React y Next.js con exportación estática. No necesita cuentas, variables de entorno ni base de datos para mostrar el portafolio.
