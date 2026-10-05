# aplicacion-diaria

Pedidos diarios del economato: pedidos por proveedor, recordatorios, anotaciones para el día siguiente, personal y rotación de turnos, historial y hojas de pedido imprimibles.

Es una sola página (`index.html`) sin compilación. Se publica en Vercel directamente desde este repositorio de GitHub: cada cambio subido a `main` se publica solo.

## Instalar en el dispositivo

Es una aplicación web instalable (PWA). Abre https://aplicacion-diaria.vercel.app y:

- **PC (Chrome o Edge)**: pulsa «Instalar» en la cabecera de la app o el icono de instalar de la barra de direcciones.
- **Android (Chrome)**: pulsa «Instalar» en la cabecera o, en el menú ⋮, «Instalar aplicación» / «Añadir a pantalla de inicio».
- **iPhone / iPad (Safari)**: botón Compartir → «Añadir a pantalla de inicio».

Una vez instalada abre sin barra del navegador, y funciona sin conexión: los cambios se guardan en el dispositivo y se suben solos al volver la conexión.

## Datos (Supabase)

- Hay que entrar con correo y contraseña (Supabase Auth).
- Todos los datos se guardan en la tabla `public.estado` (fila `principal`) y se sincronizan al momento entre dispositivos.
- Solo pueden leer y escribir los correos que estén en la tabla `public.usuarios_permitidos`. Para dar acceso a alguien, en el editor SQL de Supabase:

  ```sql
  insert into public.usuarios_permitidos (email) values ('correo@ejemplo.com');
  ```

- Cada dispositivo guarda además una copia en `localStorage` (`pedidos-v1`). Si no se puede cargar la librería de Supabase, la aplicación funciona solo con esa copia local.
