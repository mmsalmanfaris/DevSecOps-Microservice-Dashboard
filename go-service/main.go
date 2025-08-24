package main

import (
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode
	gin.SetMode(gin.ReleaseMode)

	// Create Gin router
	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check endpoint
	r.GET("/health", healthCheck)

	// Info endpoint
	r.GET("/info", infoHandler)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	// Start server
	r.Run(":" + port)
}

// Health check handler
func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":    "healthy",
		"service":   "go-service",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
		"uptime":    "running",
		"version":   runtime.Version(),
	})
}

// Info handler with system information and Fibonacci calculation
func infoHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"service":   "go-service",
		"language":  "Go",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
		"systemInfo": gin.H{
			"os":        runtime.GOOS,
			"arch":      runtime.GOARCH,
			"goVersion": runtime.Version(),
		},
		"calculation": gin.H{
			"operation": "fibonacci(10)",
			"result":    fibonacci(10),
		},
	})
}

// Fibonacci calculation function
func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}
