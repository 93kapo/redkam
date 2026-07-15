# Cómo subir esta versión a GitHub

## Importante

No subas el archivo ZIP al repositorio. El ZIP solamente sirve para descargar y transportar el proyecto.

1. Abre la carpeta `redkam-youtube-ready` en tu Mac.
2. Confirma que estás usando esta versión final, que no contiene archivos de autenticación ni configuración de Sites.
3. Sube el contenido de esa carpeta al repositorio.

## Opción recomendada: GitHub Desktop

1. Abre GitHub Desktop.
2. Selecciona **File → Add Local Repository**.
3. Elige la carpeta `redkam-youtube-ready`.
4. Crea el commit y selecciona **Publish repository** o **Push origin**.

## Si usas la página web de GitHub

En el repositorio selecciona **Add file → Upload files** y arrastra todo el contenido de `redkam-youtube-ready`. Esta versión no contiene videos locales; el proyecto completo pesa aproximadamente 3 MB y su archivo más grande es la imagen social `og.png`.

Cuando tengas tus enlaces de YouTube, pégalos en `app/youtube-links.ts` antes de subir el proyecto, o edita ese mismo archivo directamente desde GitHub.
