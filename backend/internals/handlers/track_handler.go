package handlers

import (
	"railway-signals/internals/service"
	"railway-signals/pkg/pagination"
	"railway-signals/pkg/response"
	"strconv"

	"github.com/labstack/echo/v5"
)

// TrackHandler handles track endpoints
type TrackHandler struct {
	service *service.RailwayService
}

// NewTrackHandler creates a handler
func NewTrackHandler(service *service.RailwayService) *TrackHandler {
	return &TrackHandler{service: service}
}

// GetAllTracks handles GET /api/tracks
func (h *TrackHandler) GetAllTracks(c *echo.Context) error {
	trackIDStr := c.QueryParam("track_id")
	source := c.QueryParam("source")
	target := c.QueryParam("target")

	var trackIDPtr *int
	if trackIDStr != "" {
		trackID, err := strconv.Atoi(trackIDStr)
		if err != nil {
			return response.BadRequest(c, "Invalid track_id")
		}
		if trackID <= 0 {
			return response.BadRequest(c, "track_id must be positive")
		}
		trackIDPtr = &trackID
	}

	// Get all matching tracks
	tracks := h.service.FilterTracks(trackIDPtr, source, target)

	// Parse pagination params
	params := pagination.ParseParams(c)

	// Paginate results
	paginatedTracks := pagination.Paginate(tracks, params)

	// Create pagination metadata
	meta := pagination.CreateMeta(params.Page, params.Limit, len(tracks))

	// Convert to interface slice for response
	data := make([]interface{}, len(paginatedTracks))
	for i, track := range paginatedTracks {
		data[i] = track
	}

	return response.SuccessWithPagination(c, data, meta)
}

// GetTrackByID handles GET /api/tracks/:id
func (h *TrackHandler) GetTrackByID(c *echo.Context) error {
	trackID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return response.BadRequest(c, "Invalid track ID")
	}
	if trackID <= 0 {
		return response.BadRequest(c, "track_id must be positive")
	}

	track, err := h.service.GetTrackByID(trackID)
	if err != nil {
		return response.NotFound(c, err.Error())
	}

	return response.Success(c, track, 1)
}