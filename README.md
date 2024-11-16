# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proyecto Angular con Lazy Loading</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    header {
      background: #007acc;
      color: #fff;
      padding: 20px 10px;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 2em;
    }
    p {
      margin: 10px 0;
    }
    section {
      padding: 20px;
      max-width: 800px;
      margin: auto;
      background: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .code-snippet {
      background-color: #f4f4f4;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-family: "Courier New", Courier, monospace;
      overflow-x: auto;
    }
    footer {
      text-align: center;
      padding: 10px;
      background: #ddd;
    }
  </style>
</head>
<body>

  <header>
    <h1>Proyecto Angular con Lazy Loading</h1>
    <p>Documentación para un proyecto que utiliza Lazy Loading en Angular</p>
  </header>

  <section>
    <h2>Descripción del Proyecto</h2>
    <p>Este proyecto está diseñado para mejorar el rendimiento de la aplicación utilizando Lazy Loading, cargando módulos de forma perezosa solo cuando son necesarios.</p>
  </section>

  <section>
    <h2>Estructura del Proyecto</h2>
    <p>La estructura modular incluye:</p>
    <ul>
      <li><strong>Módulo Principal (AppModule)</strong>: Configuración base de la aplicación.</li>
      <li><strong>Módulos de Funcionalidades</strong>: AdminModule, UserModule y HomeModule, que se cargan de forma perezosa.</li>
    </ul>
  </section>

  <section>
    <h2>Configuración de Rutas</h2>
    <p>A continuación, se muestra un ejemplo de configuración de rutas con Lazy Loading:</p>
    <div class="code-snippet">
      <pre><code>
const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];
      </code></pre>
    </div>
  </section>

  <section>
    <h2>Beneficios de Lazy Loading</h2>
    <ul>
      <li>Mejora el rendimiento de la aplicación al reducir el tiempo de carga inicial.</li>
      <li>Carga módulos solo cuando son necesarios, ahorrando recursos.</li>
      <li>Mejora la experiencia del usuario gracias a una navegación eficiente.</li>
    </ul>
  </section>

  <footer>
    <p>Proyecto mantenido por <strong>Tu Nombre</strong>. Consulta el <a href="https://github.com/tu-repo">repositorio en GitHub</a> para más detalles.</p>
  </footer>

</body>
</html>
