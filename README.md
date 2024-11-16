# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proyecto Angular con Lazy Loading</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .section-title {
      font-size: 1.5em;
      margin-top: 20px;
      color: #2c3e50;
    }
    .code-snippet {
      background-color: #f4f4f4;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <header>
    <h1>Proyecto Angular con Lazy Loading</h1>
    <p>Este proyecto utiliza la técnica de Lazy Loading para mejorar el rendimiento y la experiencia del usuario al cargar módulos bajo demanda.</p>
  </header>

  <section>
    <h2 class="section-title">Estructura del Proyecto</h2>
    <p>La estructura del proyecto está diseñada para dividir la aplicación en módulos independientes que se cargan de manera perezosa según sea necesario.</p>
    <ul>
      <li><strong>App Module</strong>: Módulo principal que define las rutas base.</li>
      <li><strong>Feature Modules</strong>: Módulos de características, como <code>AdminModule</code>, <code>UserModule</code>, etc.</li>
    </ul>
  </section>

  <section>
    <h2 class="section-title">Ejemplo de Configuración de Rutas</h2>
    <p>El siguiente código muestra cómo configurar rutas con Lazy Loading:</p>
    <div class="code-snippet">
      <pre><code>
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];
      </code></pre>
    </div>
  </section>

  <section>
    <h2 class="section-title">Beneficios de Lazy Loading</h2>
    <ul>
      <li>Reducción del tiempo de carga inicial de la aplicación.</li>
      <li>Carga de módulos solo cuando se necesitan.</li>
      <li>Mejora en la experiencia del usuario.</li>
    </ul>
  </section>

  <section>
    <h2 class="section-title">Cómo Funciona Lazy Loading</h2>
    <p>Cuando el usuario navega a una ruta específica, Angular carga el módulo correspondiente en ese momento, en lugar de cargar todos los módulos al inicio.</p>
  </section>

</body>
</html>


# ADD PWA

`  ng add @angular/pwa --project atr`

# modificar el meta en index.html

`    <meta name="theme-color" content="#1976d2">`

# y modificar manifest.webmanifest

` {
"name": "Atelier",
"short_name": "Atelier",
"theme_color": "#EDE4DB",
"background_color": "#EDE4DB",
"display": "standalone",
"scope": "./",
"start_url": "./",
}

        `





<!-- puntos -->

<!-- 

1:Se utilizan contraseñas fuertes 
Longitud mínima (ej. 8 o más 
caracteres)


 -->
# MyPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
