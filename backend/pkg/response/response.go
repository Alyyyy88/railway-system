package response

import (
	"net/http"

	"github.com/labstack/echo/v5"
)

// PaginationMeta contains pagination metadata
type PaginationMeta struct {
	Page       int `json:"page"`
	Limit      int `json:"limit"`
	Total      int `json:"total"`
	TotalPages int `json:"total_pages"`
}

// APIResponse is the standard API response format
type APIResponse struct {
	Success    bool             `json:"success"`
	Data       interface{}      `json:"data,omitempty"`
	Error      string           `json:"error,omitempty"`
	Count      int              `json:"count,omitempty"`
	Pagination *PaginationMeta  `json:"pagination,omitempty"`
}

// Success returns a success response
func Success(c *echo.Context, data interface{}, count int) error {
	return c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data:    data,
		Count:   count,
	})
}

// SuccessWithPagination returns a paginated success response
func SuccessWithPagination(c *echo.Context, data interface{}, pagination *PaginationMeta) error {
	return c.JSON(http.StatusOK, APIResponse{
		Success:    true,
		Data:       data,
		Count:      len(data.([]interface{})),
		Pagination: pagination,
	})
}

// BadRequest returns a 400 error
func BadRequest(c *echo.Context, message string) error {
	return c.JSON(http.StatusBadRequest, APIResponse{
		Success: false,
		Error:   message,
	})
}

// NotFound returns a 404 error
func NotFound(c *echo.Context, message string) error {
	return c.JSON(http.StatusNotFound, APIResponse{
		Success: false,
		Error:   message,
	})
}

// InternalServerError returns a 500 error
func InternalServerError(c *echo.Context, message string) error {
	return c.JSON(http.StatusInternalServerError, APIResponse{
		Success: false,
		Error:   message,
	})
}