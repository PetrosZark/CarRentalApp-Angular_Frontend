# 🚗 Car Rental App (Angular)

This project is a **Car Rental Application** built with Angular (CLI version 19.0.3). It demonstrates modular Angular development, leveraging routing, services, and component-based architecture.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js (v19 or higher)** – [Download Node.js](https://nodejs.org/)
- **Angular CLI** – Install via:
```bash
npm install -g @angular/cli
```

---

### ⚙️ Development Server
Run the following command to start the development server:
```bash
ng serve
```
Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

---

### 🛠️ Code Scaffolding
Generate new components, services, or other Angular elements using the Angular CLI:
```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

### 🏗️ Building the Project
To build the project, run:
```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

---

## 📂 Project Structure
```
src/
├── app/                          # Main Angular application
│   ├── components/               # UI components
│   ├── shared/                   # Shared logic (guards, interfaces, services)
│   ├── app.component.ts          # Root component
│   ├── app.routes.ts             # App routing
│   └── app.config.ts             # App configuration
│
├── assets/                        
│   └── images/                   # Static assets (logos, icons)
│
├── index.html                    # Main entry point
├── main.ts                       # Bootstrap logic
└── styles.css                    # Global styles
```

---

## 🌐 Deployment

To deploy the application, follow these steps:
1. Build the production version:
```bash
ng build --prod
```
2. Deploy the contents of the `dist/` folder to your preferred web server or hosting platform (e.g., Netlify, Vercel, AWS S3).

Example (Netlify):
```bash
netlify deploy --prod
```

---

## 📄 Environment Configuration
Set up environment variables for different stages (development, production). Modify files in:
```
src/environments/
├── environment.ts                # Development settings
└── environment.prod.ts           # Production settings
```
Example:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## ❓ Troubleshooting & Help
- If you encounter issues during development or deployment, run:
```bash
ng help
```
- Visit the official [Angular CLI Overview](https://angular.io/cli) and Command Reference.

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to modify and distribute it as needed.

---

## 📧 Contact
For questions or feedback, feel free to reach out:
- **Name**: Zarkadis Petros
- **Email**: petros.zark@hotmail.com

---

### 📦 Example Data
- **Admin User**: SuperAdmin / Sa123456!
- **API URL**: http://localhost:8080/api

---
