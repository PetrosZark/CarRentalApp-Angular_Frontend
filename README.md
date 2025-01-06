# 🚗 Car Rental App - Frontend (Angular) 

## A [Coding Factory](https://codingfactory.aueb.gr/) @ [AUEB](https://www.aueb.gr/) Final Project. Angular - Typescript - Car Rental Application frontend.

## Overview

The Car Rental App frontend is an Angular application that works alongside a Spring Boot backend to provide a seamless car rental experience.  
It allows users to manage cars, view listings, and handle administrative tasks through an intuitive, responsive UI.

## 🎯 Project Overview
The Car Rental App is designed to create a peer-to-peer car rental marketplace.
- Users can list their cars for rent, manage their availability, and update details through a personalized garage.
- Other users can browse and rent cars available in the system.
- Administrators have access to a restricted area to manage users and car data.

## ✨ Key Features
- **Garage Management**
  - Users can add their car(s) to a virtual garage.
  - Upload car photos and manage car details (update, delete, or mark unavailable).

- **Car Browsing**
  - View all available cars listed by other users.
  - Search and filter cars by brand or city.

- **Admin Panel**
  - Admins can manage Users – Update roles, deactivate accounts, or delete users.
  - Manage Car Data – Add car brands, models, and cities.

- **Secure Authentication**  
  - JWT-based login and session management.  
  - Role-based access control (User/Admin).    


---

## 🔧 Technologies Used

- **Angular 19.0.3**  
- **TypeScript 5.7.2**  
- **Bootstrap** (Responsive UI)  
- **Spring Boot (Backend)**  
- **MySQL**  
- **JWT** (Authentication)  
- **Node.js** (Runtime environment)  
- **Prettier** (Code formatting)   

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

## ⚙️ Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js (v20 or higher)** – [Download Node.js](https://nodejs.org/)
- **Angular CLI** – Install via:
```bash
npm install -g @angular/cli
```
### Clone the Repository
```bash
git clone https://github.com/PetrosZark/CarRentalApp-Angular_Frontend.git
```
---

### 🚀 Running the Application

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
--- 

### 🏗️ Building the Project

To build the project for development:
```bash
ng build
```

For a production build:
```bash
ng build --prod
``` 

The build artifacts will be stored in the `dist/` directory.

### 🛡️ API Configuration

To connect the frontend with the backend API, modify the environment.ts file:
```bash
export const environment = {
  production: true,
  apiUrl: 'https://your-production-url/api'
};
```
---

## 🌐 Deployment

To deploy the application, follow these steps:
1. Build the production version:
```bash
ng build --prod
```
2. Deploy the contents of the `dist/` folder to your preferred web server or hosting platform, or use docker
to containerize the application for easy deployment across environments.

### 🐳 Docker Deployment
1. Build the Angular Application for Development or Production
Before creating the Docker image, ensure the Angular app is built for production. Run the following command:

For Development:
```bash
ng build
```
For Production: 
```bash
ng build --prod
```

2. Create a Dockerfile in the root of the project:
```bash
# Use Nginx to serve static files
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy Angular build files to Nginx directory
COPY dist/carrentalapp/browser .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

3. Build the Docker Image
```bash
docker build -t carrentalapp-frontend .
```
4. Run the Container
```bash
docker run -p 80:80 carrentalapp-frontend
```
The application will be available at http://localhost.

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
