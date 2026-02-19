package handlers

import (
	"railway-signals/internals/service"
	"railway-signals/pkg/pagination"
	"railway-signals/pkg/response"
	"strconv"

	"github.com/labstack/echo/v5"
)

// SignalHandler handles signal endpoints
type SignalHandler struct {
	service *service.RailwayService
}

// NewSignalHandler creates a handler
func NewSignalHandler(service *service.RailwayService) *SignalHandler {
	return &SignalHandler{service: service}
}

// GetAllSignals handles GET /api/signals
func (h *SignalHandler) GetAllSignals(c *echo.Context) error {
	name := c.QueryParam("signal_name")
	elr := c.QueryParam("elr")
	signalIDStr := c.QueryParam("signal_id")

	var signalID *int
	if signalIDStr != "" {
		if id, err := strconv.Atoi(signalIDStr); err == nil {
			signalID = &id
		}
	}

	// Get all matching signals
	signals := h.service.FilterSignals(name, elr, signalID)

	// Parse pagination params
	params := pagination.ParseParams(c)

	// Paginate results
	paginatedSignals := pagination.Paginate(signals, params)

	// Create pagination metadata
	meta := pagination.CreateMeta(params.Page, params.Limit, len(signals))

	// Convert to interface slice for response
	data := make([]interface{}, len(paginatedSignals))
	for i, signal := range paginatedSignals {
		data[i] = signal
	}

	return response.SuccessWithPagination(c, data, meta)
}

// GetSignalByID handles GET /api/signals/:id
func (h *SignalHandler) GetSignalByID(c *echo.Context) error {
	signalID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return response.BadRequest(c, "Invalid signal ID")
	}
	if signalID <= 0 {
		return response.BadRequest(c, "signal_id must be positive")
	}

	signal, err := h.service.GetSignalByID(signalID)
	if err != nil {
		return response.NotFound(c, err.Error())
	}

	return response.Success(c, signal, 1)
}