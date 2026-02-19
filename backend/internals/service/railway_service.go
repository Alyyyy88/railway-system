package service

import (
	"railway-signals/internals/models"
	"railway-signals/internals/repository"
	"strings"
)

// RailwayService handles business logic
type RailwayService struct {
	repo *repository.RailwayRepository
}

// NewRailwayService creates a service
func NewRailwayService(repo *repository.RailwayRepository) *RailwayService {
	return &RailwayService{repo: repo}
}

// GetAllTracks gets all tracks
func (s *RailwayService) GetAllTracks() []models.Track {
	return s.repo.GetAllTracks()
}

// GetTrackByID gets track by ID
func (s *RailwayService) GetTrackByID(id int) (*models.Track, error) {
	return s.repo.GetTrackByID(id)
}

// FilterTracks filters tracks by criteria
func (s *RailwayService) FilterTracks(trackID *int, source, target string) []models.Track {
	tracks := s.repo.GetAllTracks()
	filtered := make([]models.Track, 0)

	for _, track := range tracks {
		match := true

		// Filter by track ID
		if trackID != nil && track.TrackID != *trackID {
			match = false
		}

		// Filter by source 
		if source != "" {
			if !strings.Contains(
				strings.ToLower(track.Source),
				strings.ToLower(source),
			) {
				match = false
			}
		}

		// Filter by target 
		if target != "" {
			if !strings.Contains(
				strings.ToLower(track.Target),
				strings.ToLower(target),
			) {
				match = false
			}
		}

		if match {
			filtered = append(filtered, track)
		}
	}

	return filtered
}

// GetAllSignals gets all signals
func (s *RailwayService) GetAllSignals() []models.Signal {
	return s.repo.GetAllSignals()
}

// GetSignalByID gets signal by ID
func (s *RailwayService) GetSignalByID(id int) (*models.Signal, error) {
	return s.repo.GetSignalByID(id)
}

// FilterSignals filters signals by criteria
func (s *RailwayService) FilterSignals(name, elr string, signalID *int) []models.Signal {
	signals := s.repo.GetAllSignals()
	filtered := make([]models.Signal, 0)

	for _, signal := range signals {
		match := true

		// Filter by signal ID 
		if signalID != nil {
			if signal.SignalID != *signalID {
				match = false
			}
		}

		// Filter by name
		if name != "" {
			if signal.SignalName == nil {
				match = false
			} else if !strings.Contains(
				strings.ToLower(*signal.SignalName),
				strings.ToLower(name),
			) {
				match = false
			}
		}

		// Filter by ELR
		if elr != "" {
			if signal.ELR == nil {
				match = false
			} else if !strings.Contains(
				strings.ToLower(*signal.ELR),
				strings.ToLower(elr),
			) {
				match = false
			}
		}

		if match {
			filtered = append(filtered, signal)
		}
	}

	return filtered
}

// GetTracksForSignal gets tracks associated with a signal
func (s *RailwayService) GetTracksForSignal(signalID int) (*models.SignalTrackRelationship, error) {
	signal, err := s.repo.GetSignalByID(signalID)
	if err != nil {
		return nil, err
	}

	tracks, err := s.repo.GetTracksBySignalID(signalID)
	if err != nil {
		return nil, err
	}

	return &models.SignalTrackRelationship{
		Signal: *signal,
		Tracks: tracks,
	}, nil
}