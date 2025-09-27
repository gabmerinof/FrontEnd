# FrontEnd Angular - Sistema de Gestión de Tareas

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

Frontend desarrollado con Angular 17.3.4 para el sistema de gestión de tareas, conectado con backend Firebase Functions.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Demo](#demo)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [Despliegue](#despliegue)
- [API Integration](#api-integration)

## 🚀 Características

- **Angular 17.3.4** con standalone components y signals
- **Arquitectura modular** y escalable
- **Autenticación JWT** integrada
- **Interfaz responsive** con Angular Material
- **Lazy loading** de módulos

## 🎯 Demo

**URL de producción:** [[https://tu-dominio.com](https://front-end-flame-six-18.vercel.app/)]([https://tu-dominio.com](https://front-end-flame-six-18.vercel.app/))
![32ecdfe0-14a9-4dae-9756-a8f614086fdb](https://github.com/user-attachments/assets/696b856f-21c7-498b-9f65-23510b619b2e)
![bce44979-2aca-4e4e-a708-87e39bb2c562](https://github.com/user-attachments/assets/7119391b-773f-43fc-a832-c40ebeb569aa)
![6584982d-f2c8-4f27-8acf-14da51d7f750](https://github.com/user-attachments/assets/805ca9db-0ea4-4132-856c-8d3ae2d952b1)
![630ccbc4-8941-455e-8d20-68658d2a4440](https://github.com/user-attachments/assets/91a04a36-a722-4175-83a8-e635919ba7a5)
![977798dd-f32e-4033-b9a2-355e754f4f3a](https://github.com/user-attachments/assets/46532f81-0cf1-4fa7-b7d8-b279bd6787e0)
![1d210d4f-8bca-4baa-ad0c-5f3fe2dee259](https://github.com/user-attachments/assets/1cb3a8fa-e238-448a-bc8f-6c31bb7e1ca6)

## 🛠 Tecnologías

- **Angular 17.3.4** - Framework principal
- **TypeScript** - Lenguaje tipado
- **RxJS** - Programación reactiva
- **Angular Material** - Componentes UI
- **ngPrime** - Componentes UI
- **Angular Router** - Navegación

## 📋 Requisitos

- **Node.js** 18.13+ o 20.9+
- **npm** 9.5+ o **yarn** 1.22+
- **Angular CLI** 17+

```bash
# Verificar instalaciones
node --version    # ≥ 20
npm --version     # ≥ 9.5
ng version        # ≥ 17.3.4
```

📥 Instalación
1. Clonar el Repositorio
```bash
git clone https://github.com/gabmerinof/FrontEnd.git
cd FrontEnd
```

2. Instalar Dependencias
```bash
npm install
```

3. Configurar Variables de Entorno

Editar src/environments/environment.ts:
Desarrollo Backend Local
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

Desarrollo Backend Firebase
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api-3mzawfi4rq-uc.a.run.app/api'
};
```

Desarrollo Backend Producción (vercel)
```typescript
export const environment = {
  production: false,
  apiUrl: 'api'
};
```

4. Servir la Aplicación
```bash
ng serve
# La aplicación estará en http://localhost:4200
```

🏗 Estructura del Proyecto
```text
src/
├── app/
│   ├── core/                           # Servicios singleton, interceptors
│   │   ├── guards/                     # Route guards
│   │   ├── interceptors/               # HTTP interceptors
│   │   ├── models/                     # Interfaces TypeScript
│   │   ├── services/                   # HTTP services
│   ├── Components/                     # Módulos de funcionalidad
│   │   ├── auth/                       # Módulo de autenticación
│   │   │   ├── login/                  # login component
│   │   ├── tasks/                      # Módulo de tareas
│   │   │   ├── task-list/              # task list component
│   │   │   │   ├── task-list-card/     # task list card component
│   │   │   │   ├── task-list-item-add/ # task list item add component
│   │   │   │   ├── task-list-item/     # tasl list item component
│   ├── app.routes.ts                   # Configuración de rutas
│   ├── app.config.ts                   # Configuración de la app
│   └── app.component.ts                # Componente raíz
├── assets/                             # Archivos estáticos
├── environments/                       # Configuraciones por entorno
└── styles.scss                         # Estilos globales
```

🎮 Scripts Disponibles
Desarrollo
```bash
# Servidor de desarrollo
ng serve

# Servidor con puerto específico
ng serve --port=4200

# Servidor con open browser
ng serve --open
```

Build
```bash
# Build desarrollo
ng build

# Build producción
ng build --configuration=production
```

Generación de Código
```bash
# Generar componente
ng generate component components/nombre-componente

# Generar servicio
ng generate service services/nombre-servicio

# Generar módulo
ng generate module modules/nombre-modulo
```

