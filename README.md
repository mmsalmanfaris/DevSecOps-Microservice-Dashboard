# DevSecOps Microservice Dashboard

A comprehensive multi-language microservices architecture demonstration featuring Java, Go, Node.js, Python services with a React frontend dashboard.

## 🏗️ Architecture Overview

This project demonstrates a microservices architecture with the following components:

- **Frontend**: React.js dashboard for monitoring all services
- **Java Service**: Spring Boot application for business logic processing
- **Go Service**: High-performance service for system information and calculations
- **Node.js Service**: Express.js service for session management and server statistics
- **Python Service**: Flask application for data processing and analysis


## 🚀 Quick Start with Docker Compose

The easiest way to run all microservices is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd DevSecOps-Microservice-Dashboard

# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Service Endpoints (Docker)
- **Frontend Dashboard**: http://localhost:3000
- **Go Service**: http://localhost:8081  
- **Python Service**: http://localhost:8082
- **Node.js Service**: http://localhost:8083
- **Java Service**: http://localhost:8084

## 🔧 Individual Service Setup

### Java Service (Spring Boot)
```bash
cd java-service

# Build the application
./mvnw clean package
# OR
mvn clean package

# Run the application
./mvnw spring-boot:run
# OR
mvn spring-boot:run
# OR
java -jar target/java-service-1.0.0.jar

# Run with Docker
docker build -t java-service .
docker run -p 8084:8084 java-service
```
**Endpoints:**
- `GET /health` - Health check
- `GET /info` - Service information with business logic data

### Go Service (Gin Framework)
```bash
cd go-service

# Install dependencies
go mod download

# Run the application
go run main.go

# Build executable
go build -o go-service main.go
./go-service

# Run with Docker
docker build -t go-service .
docker run -p 8081:8081 go-service
```
**Endpoints:**
- `GET /health` - Health check with system info
- `GET /info` - System information and calculations

### Node.js Service (Express.js)
```bash
cd nodejs-service

# Install dependencies
npm install

# Start the application
npm start


# Run tests with coverage
npm test

# Run with Docker
docker build -t nodejs-service .
docker run -p 8083:8083 nodejs-service
```

**Endpoints:**
- `GET /health` - Health check with memory usage
- `GET /info` - Session info and server statistics

### Python Service (Flask)
```bash
cd python-service

# Install dependencies
pip install -r requirements.txt
# OR for virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run the application
python app.py

# Run tests
pytest

# Run with Docker
docker build -t python-service .
docker run -p 8082:8082 python-service
```

**Endpoints:**
- `GET /health` - Health check with uptime
- `GET /info` - Data processing and statistics

### React Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run with Docker
docker build -t frontend .
docker run -p 3000:80 frontend
```

## 🎯 Service Health Checks

All services provide health check endpoints:

```bash
# Check all services health
curl http://localhost:8081/health  # Go Service
curl http://localhost:8082/health  # Python Service  
curl http://localhost:8083/health  # Node.js Service
curl http://localhost:8084/health  # Java Service

# Get detailed service information
curl http://localhost:8081/info   # Go Service
curl http://localhost:8082/info   # Python Service
curl http://localhost:8083/info   # Node.js Service  
curl http://localhost:8084/info   # Java Service
```

## ☸️ Kubernetes Deployment

Deploy to Kubernetes cluster:

```bash
# Apply all Kubernetes manifests
kubectl apply -f k8s/

# Check deployments
kubectl get deployments
kubectl get services
kubectl get pods

# Check ingress (if NGINX Ingress Controller is installed)
kubectl get ingress

# Port forward to access services locally
kubectl port-forward svc/frontend-service 3000:80
kubectl port-forward svc/java-service 8084:8084
kubectl port-forward svc/go-service 8081:8081
kubectl port-forward svc/nodejs-service 8083:8083
kubectl port-forward svc/python-service 8082:8082

# Delete all resources
kubectl delete -f k8s/
```

### Kubernetes Resources

The `k8s/` directory contains:
- **Deployments**: Service deployment configurations
- **Services**: Service exposure configurations  
- **Ingress**: Traffic routing configuration
- **MetalLB**: Load balancer configuration

### Access via Ingress
If ingress is configured with domain `micro.local`:
- Frontend: http://micro.local/
- Java Service: http://micro.local/java/
- Go Service: http://micro.local/go/
- Node.js Service: http://micro.local/node/
- Python Service: http://micro.local/python/


## 📁 Project Structure

```
DevSecOps-Microservice-Dashboard/
├── README.md                          # This file
├── docker-compose.yaml               # Docker Compose configuration
├── frontend/                         # React.js frontend
│   ├── src/components/Dashboard.js   # Main dashboard component
│   ├── package.json                  # Frontend dependencies
│   └── Dockerfile                    # Frontend container config
├── java-service/                     # Spring Boot service
│   ├── src/main/java/               # Java source code
│   ├── pom.xml                      # Maven dependencies
│   └── Dockerfile                   # Java container config
├── go-service/                      # Go service
│   ├── main.go                      # Go application
│   ├── go.mod                       # Go dependencies
│   └── Dockerfile                   # Go container config
├── nodejs-service/                  # Node.js service
│   ├── server.js                    # Express.js application
│   ├── package.json                 # Node.js dependencies
│   └── Dockerfile                   # Node.js container config
├── python-service/                  # Python Flask service
│   ├── app.py                       # Flask application
│   ├── requirements.txt             # Python dependencies
│   └── Dockerfile                   # Python container config
└── k8s/                            # Kubernetes manifests
    ├── *-deployment.yaml            # Service deployments
    ├── *-service.yaml               # Service configurations
    ├── ingress.yaml                 # Ingress configuration
    └── metalLB-config.yaml          # Load balancer config
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.