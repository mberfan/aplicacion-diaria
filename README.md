# aplicacion-diaria

**Economato**: pedidos diarios por proveedor, recordatorios, anotaciones para el día siguiente, personal y rotación de turnos, historial y hojas de pedido imprimibles.

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
- **Acceso por aprobación**: cada persona crea su cuenta desde la app con su nombre, correo y contraseña. Queda **en espera** (ve una pantalla de bienvenida) hasta que un administrador la acepta.
- **Administración**: los administradores tienen la pestaña **Usuarios**, donde aceptan o rechazan a las personas nuevas, eligen a qué secciones pueden entrar (Hoy y pedidos del día, Historial, Proveedores, Personal), les quitan el acceso o las hacen administradoras.
- En la base de datos, la tabla `public.perfiles` guarda el estado y los permisos de cada cuenta. Solo las cuentas aceptadas pueden leer o escribir los datos de la app; cada persona solo puede cambiar su propio nombre.
- Los permisos por sección se aplican en la app: ocultan las secciones a las que la persona no tiene acceso.
- Cada dispositivo guarda además una copia en `localStorage` (`pedidos-v1`). Si no se puede cargar la librería de Supabase, la aplicación funciona solo con esa copia local.
