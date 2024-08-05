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
**1.** To log in to your DockerHub account from the command line, you can use the following command:
```bash
docker login -u <your-username> -p <your-password>
```
**2.** Frontend Build Image & Push DockerHub:

Go to frontend Directory.
```bash
cd frontend
```
Build Image.
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
**3.** Backend Build Image & Push DockerHub:

Go to backend Directory.
```bash
cd backend
```
Build Image.
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
### Note: To update frontend.yaml and backend.yaml to use your Docker Hub username. ![image](https://github.com/user-attachments/assets/2e31512d-6ea2-4c7e-b33a-40a56db17521)

2. you can apply all the **YAML** files in a single command if they are in the same directory:
```bash
kubectl apply -f .
```
3. To get all resources in the **default** namespace:
```bash
kubectl get all
```
### Note: First Enable addons ingress-nginx controller in minikube.
```bash 
minikube addons enable ingress
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
Step 1: Install NFS Server on the Server Machine
Update the package index:
```bash
sudo apt update
```
Install the NFS kernel server package:
```bash
sudo apt install nfs-kernel-server
```
Step 2: Configure the NFS Server
Create the directory you want to share:
```bash
sudo mkdir -p /mnt/volume
```
Change the permissions of the directory (optional, depending on your requirements):
```bash
sudo chown nobody:nogroup /mnt/volume
sudo chmod 777 /mnt/volume
```
Edit the exports file to share the directory:
Open the exports file with a text editor:
```bash
sudo nano /etc/exports
```
Add the following line to share the directory with specific client IP addresses:
```bash
/mnt/volume 192.168.1.0/24(rw,sync,no_subtree_check) # Ensure This IP Address your NFS Server IP.
```
Here, 192.168.1.0/24 allows all clients in the 192.168.1.x network to access the share.
Export the shared directories:
```bash
sudo exportfs -a
```
Restart the NFS server to apply the changes:
```bash
sudo systemctl restart nfs-kernel-server
```
### These Steps Run Every Worker Node's.
Step 1: Install NFS Client on the Client Machine
Update the package index:
```bash
sudo apt update
```
Install the NFS common package:
```bash
sudo apt install nfs-common
```
Step 2: Mount the NFS Share on the Client Machine
Create a mount point for the NFS share:
```bash
sudo mkdir -p /mnt/volume
```
Mount the NFS share to the mount point:
```bash
sudo mount 192.168.1.100:/mnt/volume /mnt/volume # Ensure This IP of Your NFS server IP.
```
Replace 192.168.1.100 with the IP address of your NFS server.

Verify the mount:
```bash
df -h
```
You should see the NFS share listed in the output.
Step 3: Configure NFS Share to Mount Automatically
To make the NFS share mount automatically at boot time, add an entry to the /etc/fstab file on the client machine:
Open the fstab file for editing:
```bash
sudo nano /etc/fstab
```
Add the following line to the end of the file:
```bash
192.168.1.100:/mnt/volume /mnt/volume nfs defaults 0 0
```
Save and close the file.
Test the fstab entry:
```bash
sudo mount -a
```
Step 4: Verify NFS Configuration
You can test the NFS setup by creating a file on the NFS share from the client machine and checking if it appears on the server:
Create a file on the client:
```bash
sudo touch /mnt/volume/testfile
```
Check the file on the server:
```bash
ls /mnt/volume
```
You should see testfile listed in the output.

Update /etc/hosts

To configure custom hostnames for accessing your services, follow these steps:
Open the /etc/hosts file: Use a text editor with elevated permissions to edit the file. For example:
```bash
sudo nano /etc/hosts
```
Add Two Lines:
```bash
192.168.49.2   frontend.example.com   # Ensure this IP is correct for your Node's IP
192.168.49.2   backend.example.com    # Ensure this IP is correct for your Node's IP
```
Check in Your Browser
Open your web browser and use the following URLs to verify if the services are accessible:

Open Frontend URL:
```bash
frontend.example.com
```
Open Backend URL:
```bash
backend.example.com
```

### Project OutPut...
1. ![Screenshot from 2024-08-05 16-06-39](https://github.com/user-attachments/assets/b7c43182-8960-494f-b8ae-d83b12de0ddb)
2. ![Screenshot from 2024-08-05 16-06-47](https://github.com/user-attachments/assets/13411173-249d-4ebc-a926-c15310d44398)
3. ![Screenshot from 2024-08-05 16-07-09](https://github.com/user-attachments/assets/ca5e91bc-09d3-460c-b2ab-a3cacba0d982)
4. ![Screenshot from 2024-08-05 16-07-31](https://github.com/user-attachments/assets/3aa2740e-b830-426e-83b9-89d03f557f04)
5. ![Screenshot from 2024-08-05 16-09-26](https://github.com/user-attachments/assets/c8ed30f4-6525-4ee9-9800-97c893725b6e)
