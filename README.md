# Ecommerce Project
This project is a complete Ecommerce application with frontend and backend components, deployed using Kubernetes. Docker Compose is used for local development and testing.

## Features
- User authentication
- Product listings
- Shopping cart
- Login/Register

## Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)

## Getting Started
### Clone the Repository
```bash
git clone https://github.com/umer104/E-Commerce-Cluster.git
cd E-Commerce-Cluster
```
## 1. Build Images and Push DockerHub
1. To log in to your DockerHub account from the command line, you can use the following command:
```bash
docker login -u <your-username> -p <your-password>
```
2. Frontend Build Image & Push DockerHub:
Go to frontend Directory.
```bash
cd frontend
```
Build Image.
Go to frontend Directory.
```bash
docker build -t frontend .
```
Tag Image.
```bash
docker tag frontend yourusername/frontend:latest
```
Push Image.
```bash
docker push yourusername/frontend:latest
```
3. Backend Build Image & Push DockerHub:
Go to backend Directory.
```bash
cd backend
```
Build Image.
Go to backend Directory.
```bash
docker build -t backend .
```
Tag Image.
```bash
docker tag backend yourusername/backend:latest
```
Push Image.
```bash
docker push yourusername/backend:latest
```
#### Docker Compose
Run the following commands to build and start the containers for the frontend, backend, and database:
```bash
docker compose up -d # Run this command and wait for 3 to 5 minutes for the containers to be properly running.
```

#### Update /etc/hosts
To configure custom hostnames for accessing your services, follow these steps:

**Open the `/etc/hosts` file**:
   Use a text editor with elevated permissions to edit the file. For example:
   ```bash
   sudo nano /etc/hosts
   ```
**Add Two Lines**:
   ```bash
   192.168.1.100   frontend.example.com   # Ensure this IP is correct for your VM
   192.168.1.100   backend.example.com    # Ensure this IP is correct for your VM
   ```

#### Check in Your Browser
Open your web browser and use the following URLs to verify if the services are accessible:

**Open Frontend URL**:
   ```bash
   frontend.example.com:3000
   ```
**Open Backend URL**:
   ```bash
   backend.example.com:8000
   ```

## 2. Kubernetes
1. Go to the Kubernetes Directory.
```bash
cd Kubernetes
```
2. you can apply all the **YAML** files in a single command if they are in the same directory:
```bash
kubectl apply -f .
```
3. To get all resources in the **default** namespace:
```bash
kubectl get all
```
4. To get all Ingress resources in the **ingress-nginx** namespace:
```bash
kubectl get all -n ingress-nginx
```
5. Go to volume Directory.
```bash
cd volume
```
6. apply all the **YAML** files. But first create pv-class.
```bash
kubectl apply -f pv-class.yaml
```
```bash
kubectl apply -f .
```

## 3. Setup NFS Server
