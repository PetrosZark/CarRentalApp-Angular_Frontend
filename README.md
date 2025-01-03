# 🚗 Car Rental App (Angular)

## A Coding Factory @ AUEB Final Project. Angular - Typescript - Car Rental Application frontend.

## Description

This project is a Car Rental Application developed with Angular (CLI 19.0.3) for the frontend and Spring Boot for the backend. It showcases modern web development practices, utilizing modular design, routing, services, and a component-based architecture.

## 🎯 Project Overview
The Car Rental App is designed to create a peer-to-peer car rental marketplace.
- Users can list their cars for rent, manage their availability, and update details through a personalized garage.
- Other users can browse and rent cars available in the system.
- Administrators have access to a restricted area to manage users and car data.

## ✨ Key Features
- Garage Management
  - Users can add their car(s) to a virtual garage.
  - Upload car photos and manage car details (update, delete, or mark unavailable).

- Car Browsing
  - View all available cars listed by other users.
  - Search and filter cars by brand or city.

- Admin Panel
 - Admins can:
   - Manage Users – Update roles, deactivate accounts, or delete users.
   - Manage Car Data – Add car brands, models, and cities.

## 🖥️ Screenshots
Below are screenshots of the app's key features and pages.

<table>
  <tr>
    <td><img src="./src/assets/screenshots/Welcome.png" alt="Welcome Screen" width="400"></td>
    <td><img src="src/assets/screenshots/Register.png" alt="Register Screen" width="400"></td>
    <td><img src="src/assets/screenshots/Login.png" alt="Login Screen" width="400"></td>
  </tr>
  <tr>
    <td><img src="src/assets/screenshots/Home.png" alt="Home Screen" width="400"></td>
    <td><img src="src/assets/screenshots/Search2.png" alt="Search Screen" width="400"></td>
    <td><img src="src/assets/screenshots/Garage.png" alt="Garage Screen" width="400"></td>
  </tr>
  <tr>
    <td><img src="src/assets/screenshots/Entity_Manager.png" alt="Entity Manager" width="400"></td>
    <td><img src="src/assets/screenshots/Users.png" alt="Users Screen" width="400"></td>
    <td><img src="src/assets/screenshots/Brands.png" alt="Brands" width="400"></td>
  </tr>
  <tr>
    <td><img src="src/assets/screenshots/Models.png" alt="Models" width="400"></td>
    <td><img src="src/assets/screenshots/Cities.png" alt="Cities" width="400"></td>
    <td><img src="src/assets/screenshots/Garage2.png" alt="Garage View 2" width="400"></td>
  </tr>
</table>

---

## 🔧 Technology Stack

- **Frontend**: Angular 19.0.3 (TypeScript (5.7.2), Bootstrap for responsive UI)  
- **Backend**: Spring Boot (REST API, Hibernate ORM)  
- **Build Tools**: Gradle (for backend builds)  
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) for secure login and role management  
- **Code Quality**: Prettier (consistent code formatting)  

---
## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js (v20 or higher)** – [Download Node.js](https://nodejs.org/)
- **Angular CLI** – Install via:
```bash
npm install -g @angular/cli
```

### ⚙️ Development Server

Run the following command to start the development server:
```bash
ng serve
```
Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

### 🛠️ Code Scaffolding

Generate new components, services, or other Angular elements using the Angular CLI:
```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### 🏗️ Building the Project

Navigate to the Project Directory:

```bash
cd carrentalapp
```

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

---

## 📧 Contact
For questions or feedback, feel free to reach out:
- **Name**: Zarkadis Petros
- **Email**: petros.zark@hotmail.com

---

### 📦 Example Data
- **Admin User**: username: SuperAdmin / password: Sa123456!
- **API URL**: http://localhost:8080/api

---
