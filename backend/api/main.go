package main

import (
	"log"
	"railway-signals/internals/handlers"
	"railway-signals/internals/repository"
	"railway-signals/internals/service"
	"railway-signals/pkg/config"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	// Load configuration
	cfg := config.Load()
	
	log.Printf("Starting Railway Signals API in %s mode", cfg.Server.Env)
	log.Printf("Server will listen on %s", cfg.GetAddress())

	// Create Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: cfg.CORS.AllowedOrigins,
		AllowMethods: cfg.CORS.AllowedMethods,
	}))

	// Initialize repository
	repo := repository.NewRailwayRepository()
	if err := repo.LoadFromJSON(cfg.Database.DataFilePath); err != nil {
		log.Fatalf("Failed to load data from %s: %v", cfg.Database.DataFilePath, err)
	}
	log.Printf("Data loaded successfully from %s", cfg.Database.DataFilePath)

	// Initialize service
	svc := service.NewRailwayService(repo)

	// Initialize handlers
	trackHandler := handlers.NewTrackHandler(svc)
	signalHandler := handlers.NewSignalHandler(svc)
	relationshipHandler := handlers.NewRelationshipHandler(svc)

	// Routes
	api := e.Group("/api")
	
	// Track endpoints
	api.GET("/tracks", trackHandler.GetAllTracks)
	api.GET("/tracks/:id", trackHandler.GetTrackByID)
	
	// Signal endpoints
	api.GET("/signals", signalHandler.GetAllSignals)
	api.GET("/signals/:id", signalHandler.GetSignalByID)
	
	// Relationship endpoint
	api.GET("/signals/:id/tracks", relationshipHandler.GetTracksForSignal)

	// Health check
	e.GET("/health", func(c *echo.Context) error {
		return c.JSON(200, map[string]interface{}{
			"status":      "healthy",
			"environment": cfg.Server.Env,
		})
	})

	// Start server
	log.Printf("Server running on http://%s", cfg.GetAddress())
	log.Fatal(e.Start(":" + cfg.Server.Port))
}