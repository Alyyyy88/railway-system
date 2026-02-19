package models

import "math"

// Signal represents a railway signal
type Signal struct {
	SignalID   int      `json:"signal_id"`
	SignalName *string  `json:"signal_name"` // Can be null
	ELR        *string  `json:"elr"`         // Can be null
	Mileage    *float64 `json:"mileage"`     // Can be  NaN 
}

// IsValid checks if signal has minimum required data
func (s *Signal) IsValid() bool {
	return s.SignalID > 0 && s.SignalName != nil
}

// HasValidMileage checks if mileage is valid
func (s *Signal) HasValidMileage() bool {
	if s.Mileage == nil {
		return false
	}
	return !math.IsNaN(*s.Mileage) && !math.IsInf(*s.Mileage, 0)
}

// GetSignalName returns signal name or default
func (s *Signal) GetSignalName() string {
	if s.SignalName != nil && *s.SignalName != "" {
		return *s.SignalName
	}
	return "Unknown Signal"
}

// GetELR returns ELR or default
func (s *Signal) GetELR() string {
	if s.ELR != nil && *s.ELR != "" {
		return *s.ELR
	}
	return "N/A"
}