package pagination

import (
	"math"
	"railway-signals/pkg/response"
	"strconv"

	"github.com/labstack/echo/v5"
)

const (
	DefaultPage  = 1
	DefaultLimit = 20
	MaxLimit     = 100
)

// Params holds pagination parameters
type Params struct {
	Page   int
	Limit  int
	Offset int
}

// ParseParams extracts pagination params from query string
func ParseParams(c *echo.Context) Params {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	// Set defaults
	if page < 1 {
		page = DefaultPage
	}
	if limit < 1 {
		limit = DefaultLimit
	}
	if limit > MaxLimit {
		limit = MaxLimit
	}

	offset := (page - 1) * limit

	return Params{
		Page:   page,
		Limit:  limit,
		Offset: offset,
	}
}

// CreateMeta creates pagination metadata
func CreateMeta(page, limit, total int) *response.PaginationMeta {
	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	
	return &response.PaginationMeta{
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
	}
}

// Paginate returns a slice of the data for the current page
func Paginate[T any](data []T, params Params) []T {
	total := len(data)
	
	// If offset is beyond data length, return empty slice
	if params.Offset >= total {
		return []T{}
	}

	end := params.Offset + params.Limit
	if end > total {
		end = total
	}

	return data[params.Offset:end]
}
