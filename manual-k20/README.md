# Manual K20 – Team Padilla

Material del **Manual K20** (38 páginas A4) y de la **portada del manual de taller del Civic EG**. Está guardado aquí para seguir trabajando otro día. Esta rama (`manual-k20`) es independiente de la app del economato: no se publica ni la afecta.

## Contenido

| Carpeta | Qué hay |
|---|---|
| `manual/manual-k20.html` | El texto, las tablas y los dibujos del manual. Es el archivo que se edita. |
| `manual/Manual-K20-Team-Padilla.pdf` | El PDF listo para imprimir (última versión). |
| `manual/generar-pdf.js` | Vuelve a crear el PDF y recalcula los números de página del índice. |
| `portada/` | Portada «HONDA CIVIC EG – TEAM PADILLA»: HTML, PDF, vista previa y script. |
| `fotos/` | Aquí van las fotos que se quieran añadir al manual. |
| `*/f/` y `*/fuentes-local.css` | Tipos de letra (Google Fonts, licencia libre OFL) para que el PDF salga igual sin internet. |

## Para seguir otro día

Pídele a Claude, en una sesión de este repositorio:

> «Sigue con el manual K20 que está en la rama `manual-k20`, carpeta `manual-k20/`.»

Para añadir fotos:
1. Mándalas en la conversación (clip o «+» junto al cuadro de texto).
2. Di en qué capítulo o junto a qué dato va cada una.
3. Claude las guarda en `fotos/`, las coloca en el manual, regenera el PDF y lo sube a esta rama.

## Regenerar los PDF (uso técnico)

```bash
node manual-k20/manual/generar-pdf.js
node manual-k20/portada/generar-pdf.js
```

Requieren Node.js con Playwright y Chromium, además de `pdfinfo` y `pdftotext` (poppler-utils).

## Notas sobre el contenido

- Cada dato del manual lleva su número de fuente (capítulo 20) y una marca: CONTRASTADO, VARÍA o VERIFICAR.
- Los pares de apriete, reglajes e intervalos que no se encontraron en fuentes fiables están en las tablas en blanco del capítulo 17, para copiarlos del manual oficial de Honda.
- El emblema de la «H» es un dibujo propio inspirado en el de Honda, no el logotipo oficial.
