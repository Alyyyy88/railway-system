package handlers

import (
	"railway-signals/internals/service"
	"railway-signals/pkg/response"
	"strconv"

	"github.com/labstack/echo/v5"
)

// RelationshipHandler handles relationship endpoints
type RelationshipHandler struct {
	service *service.RailwayService
}

// NewRelationshipHandler creates a handler
func NewRelationshipHandler(service *service.RailwayService) *RelationshipHandler {
	return &RelationshipHandler{service: service}
}

// GetTracksForSignal handles GET /api/signals/:id/tracks
func (h *RelationshipHandler) GetTracksForSignal(c *echo.Context) error {
	signalID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return response.BadRequest(c, "Invalid signal ID")
	}
	if signalID <= 0 {
		return response.BadRequest(c, "signal_id must be positive")
	}

	relationship, err := h.service.GetTracksForSignal(signalID)
	if err != nil {
		return response.NotFound(c, err.Error())
	}

	return response.Success(c, relationship, len(relationship.Tracks))
}