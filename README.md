# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server
# Proyecto Angular con Lazy Loading

Este proyecto utiliza la técnica de Lazy Loading para mejorar la eficiencia de carga en aplicaciones Angular. A continuación, se describen las principales características y estructura del proyecto.

## Características principales

- **Lazy Loading:** Carga diferida de módulos para mejorar el rendimiento.
- **Modularidad:** Separación lógica del código en módulos específicos.
- **Rutas protegidas:** Gestión de rutas seguras con `AuthGuards`.

## Estructura del proyecto

```bash
src/
├── app/
│   ├── core/               # Módulo central con servicios y componentes comunes
│   ├── shared/             # Componentes y utilidades compartidas
│   ├── modules/     # Ejemplo de módulo cargado con Lazy Loading
│   └── app-routing.module.ts  # Definición de rutas principales
├── assets/                 # Recursos estáticos (imágenes, estilos, etc.)
└── index.html              # Archivo HTML principal
