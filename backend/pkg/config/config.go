package config

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

// Config holds application configuration
type Config struct {
	Server   ServerConfig
	CORS     CORSConfig
	Database DatabaseConfig
}

// ServerConfig holds server-related configuration
type ServerConfig struct {
	Port string
	Host string
	Env  string // development, production, etc.
}

// CORSConfig holds CORS-related configuration
type CORSConfig struct {
	AllowedOrigins []string
	AllowedMethods []string
}

// DatabaseConfig holds database-related configuration
type DatabaseConfig struct {
	DataFilePath string
}

// Load loads configuration from environment variables with defaults
func Load() *Config {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	return &Config{
		Server: ServerConfig{
			Port: getEnv("PORT", "8080"),
			Host: getEnv("HOST", "0.0.0.0"),
			Env:  getEnv("ENV", "development"),
		},
		CORS: CORSConfig{
			AllowedOrigins: getEnvAsSlice("CORS_ALLOWED_ORIGINS", []string{
				"http://localhost:5173",
				"http://localhost:3000",
			}),
			AllowedMethods: getEnvAsSlice("CORS_ALLOWED_METHODS", []string{
				"GET", "POST", "OPTIONS",
			}),
		},
		Database: DatabaseConfig{
			DataFilePath: getEnv("DATA_FILE_PATH", "data/crosstech-test-data.json"),
		},
	}
}

// getEnv retrieves an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvAsSlice retrieves an environment variable 
func getEnvAsSlice(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		return strings.Split(value, ",")
	}
	return defaultValue
}

// GetAddress returns the full server address
func (c *Config) GetAddress() string {
	return c.Server.Host + ":" + c.Server.Port
}

// IsDevelopment returns true if running in development mode
func (c *Config) IsDevelopment() bool {
	return c.Server.Env == "development"
}

// IsProduction returns true if running in production mode
func (c *Config) IsProduction() bool {
	return c.Server.Env == "production"
}
