# 📂 Files Manager

Files Manager is a simple and efficient platform for uploading, organizing, and viewing files. It provides a seamless experience for users to manage their files securely with authentication and permission settings.

## 🚀 Features

- 🔐 **User Authentication**: Secure token-based authentication.
- 📁 **File Management**: Upload, list, and view files with ease.
- 🔄 **Permission Control**: Toggle file visibility between **private** and **public**.
- 🖼️ **Image Processing**: Background task support for generating thumbnails.

---

## 🛠️ Deployment & Setup

This project is fully containerized using **Docker** and **Docker Compose**, making it easy to set up and deploy.

### **Prerequisites**
- **Docker** installed on your system.
- **Docker Compose** (comes with Docker Desktop).

### **Installation Steps**
1. **Clone the repository**:
   ```sh
   git clone https://github.com/LeroySBN/files_manager_v2.git
   cd files_manager_v2
   ```
2. **Copy the environment variables template and configure**:
   ```sh
   cp .env.example .env
   ```
    - Update `.env` with your desired configuration.

3. **Build and run the services**:
   ```sh
   cd docker
   docker compose --env-file docker/.env up --build -d
   ```
4. **Verify running containers**:
   ```sh
   docker ps
   ```

---

## 🏗️ Project Structure

```
.
├── api/            # Backend API (Node.js, Express)
├── web-app/        # Frontend (React, Webpack)
├── scripts/        # Utility scripts
├── docker/         # Docker configurations
│   ├── Dockerfile.api  # API Dockerfile
│   ├── Dockerfile.web  # Web App Dockerfile
│   ├── docker-compose.yml  # Docker Compose Configuration
│   ├── .env.example  # Environment Variables Template
└── README.md        # Project Documentation
```

---

## 📜 API Documentation

Detailed API documentation is available in **Postman**.  
🔗 Click [here](https://web.postman.co/workspace/b5c98977-165e-4a15-9cb5-2e7174b98542) to explore the API endpoints.

---

## 🔄 Stopping & Removing Containers

To stop the containers:
```sh
docker compose down
```

To remove all containers, networks, and volumes:
```sh
docker compose down --volumes
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 🛠️ Troubleshooting

If you encounter any issues:
- Check logs using:
  ```sh
  docker compose logs -f
  ```
- Ensure Docker is running correctly.
- Verify environment variables in the `.env` file.

---

## 📜 License

This project is licensed under the **ISC License**.
```

---

### **🔧 What’s Improved?**
✅ **Added Docker Setup Instructions** → Since we now use Docker, installation and running the app are simplified.  
✅ **Updated Project Structure** → Reflects the new folder organization, including `docker/`.  
✅ **Updated API Documentation Section** → Keeps the Postman link intact but improves formatting.  
✅ **Added Troubleshooting & Contributing Sections** → Helps with debugging and encourages contributions.  

Now, this README is **clean, informative, and easy to follow**! 🚀 Let me know if you'd like any changes. 😃