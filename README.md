# Harshit Kumar - Professional Portfolio

A modern, accessible, and responsive portfolio application showcasing my professional experience, skills, and projects as a Full Stack Developer.

## 🚀 Features

- **Responsive design** for all devices (desktop, tablet, mobile)
- **Modern UI** with smooth animations and transitions
- **Accessible**: semantic HTML, ARIA, keyboard navigation, visible focus
- **Interactive sections** for experience, skills, and projects
- **Contact information** with social links
- **Real-time updates** for projects using SignalR
- **API** for managing project data

## 🌐 Live Demo

> _Coming soon!_
> (Deploy your frontend and backend and add your link here)

## 🛠️ Technologies Used

- **Frontend:**
    - Angular
    - TypeScript
    - HTML5, CSS3
    - SignalR Client
- **Backend:**
    - .NET Core
    - C#
    - ASP.NET Core Web API
    - Entity Framework Core
    - SQL Server LocalDB
    - SignalR Hub
    - AutoMapper
- **Other:**
    - Git
    - npm
    - .NET SDK

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── Portfolio.Api/
│   ├── Portfolio.Data/
│   └── Portfolio.sln
├── frontend/
│   └── portfolio-frontend/
├── .git/
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
```

## ⚡ Setup and Local Development

To run this project locally, you need to have the .NET SDK and Node.js/npm installed.

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd portfolio
   ```

2. **Set up the Backend API:**
   - Navigate to the backend API project directory:
     ```bash
     cd backend/Portfolio.Api
     ```
   - Run the database migrations and start the API:
     ```bash
     dotnet run
     ```
   The API should be running at `http://localhost:5102`.

3. **Set up the Frontend Application:**
   - Open a *new* terminal window and navigate to the frontend project directory:
     ```bash
     cd frontend/portfolio-frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the Angular development server:
     ```bash
     ng serve
     ```
   The frontend application should be running at `http://localhost:4200`.

4. **Access the Application:**
   - Open your web browser and navigate to `http://localhost:4200`.

> **Note:** Ensure both the backend API (`dotnet run`) and the frontend application (`ng serve`) are running simultaneously in separate terminal windows.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋 Contact

Harshit Kumar  
Email: harshit2hk@gmail.com  
LinkedIn: [Harshit Kumar](https://www.linkedin.com/in/harshit-kumar41/)  
Phone: +91 8299446362
