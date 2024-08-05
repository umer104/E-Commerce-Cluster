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


### 2. Docker Compose
Run the following commands to build and start the containers for the frontend, backend, and database:
```bash
docker compose up -d # Run this command and wait for 3 to 5 minutes for the containers to be properly running.
```

### 3. Update /etc/hosts
To configure custom hostnames for accessing your services, follow these steps:
**1. Open the `/etc/hosts` file**:
   Use a text editor with elevated permissions to edit the file. For example:
   ```bash
   sudo nano /etc/hosts
   ```
**2. Add Two Lines**:
   ```bash
   192.168.1.100   frontend.example.com   # Ensure this IP is correct for your VM
   192.168.1.100   backend.example.com    # Ensure this IP is correct for your VM
   ```

### 4. Check in Your Browser
Open your web browser and use the following URLs to verify if the services are accessible:
**1. Open Frontend URL**:
   ```bash
   frontend.example.com:3000
   ```
**2. Open Backend URL**:
   ```bash
   backend.example.com:8000
   ```
## 2. Kubernetes
Go to the Kubernetes Directory.
```bash
cd Kubernetes
```
**1.** you can apply all the **YAML** files in a single command if they are in the same directory:
```bash
kubectl apply -f .
```
**2.** To get all resources in the **default** namespace:
```bash
kubectl get all
```
**3.** To get all Ingress resources in the **ingress-nginx** namespace:
```bash
kubectl get all -n ingress-nginx
```
Go to volume Directory.
```bash
cd volume
```
**4.** apply all the **YAML** files. But first create pv-class.
```bash
kubectl apply -f pv-class.yaml
```
```bash
kubectl apply -f .
```

## 3. Setup NFS Server
