package repository

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
	"railway-signals/internals/models"
	"sync"
)

// RailwayRepository handles data storage
type RailwayRepository struct {
	tracks      []models.Track
	trackIndex  map[int]*models.Track
	signalIndex map[int]*models.Signal
	signalTracks map[int][]int // signal_id -> track_ids
	mu          sync.RWMutex
}

// NewRailwayRepository creates a new repository
func NewRailwayRepository() *RailwayRepository {
	return &RailwayRepository{
		tracks:       make([]models.Track, 0),
		trackIndex:   make(map[int]*models.Track),
		signalIndex:  make(map[int]*models.Signal),
		signalTracks: make(map[int][]int),
	}
}

// LoadFromJSON loads data from JSON file
func (r *RailwayRepository) LoadFromJSON(filePath string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	// Read file
	data, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("failed to read file: %w", err)
	}

	// Parse JSON
	var tracks []models.Track
	if err := json.Unmarshal(data, &tracks); err != nil {
		return fmt.Errorf("failed to parse JSON: %w", err)
	}

	// Clean data
	r.tracks = r.cleanData(tracks)
	
	// Build indices
	r.buildIndices()

	return nil
}

// cleanData handles NaN and invalid data from Python
func (r *RailwayRepository) cleanData(tracks []models.Track) []models.Track {
	cleaned := make([]models.Track, 0)

	for _, track := range tracks {
		// Clean signals
		cleanSignals := make([]models.Signal, 0)
		for _, signal := range track.Signals {
			// Fix NaN mileage
			if signal.Mileage != nil {
				if math.IsNaN(*signal.Mileage) || math.IsInf(*signal.Mileage, 0) {
					signal.Mileage = nil
				}
			}
			
			if signal.SignalID > 0 {
				cleanSignals = append(cleanSignals, signal)
			}
		}
		
		track.Signals = cleanSignals
		
		if track.IsValid() {
			cleaned = append(cleaned, track)
		}
	}

	return cleaned
}

// buildIndices creates lookup maps
func (r *RailwayRepository) buildIndices() {
	r.trackIndex = make(map[int]*models.Track)
	r.signalIndex = make(map[int]*models.Signal)
	r.signalTracks = make(map[int][]int)

	for i := range r.tracks {
		track := &r.tracks[i]
		r.trackIndex[track.TrackID] = track

		for j := range track.Signals {
			signal := &track.Signals[j]
			r.signalIndex[signal.SignalID] = signal
			r.signalTracks[signal.SignalID] = append(
				r.signalTracks[signal.SignalID],
				track.TrackID,
			)
		}
	}
}

// GetAllTracks returns all tracks
func (r *RailwayRepository) GetAllTracks() []models.Track {
	r.mu.RLock()
	defer r.mu.RUnlock()
	
	tracks := make([]models.Track, len(r.tracks))
	copy(tracks, r.tracks)
	return tracks
}

// GetTrackByID gets a track by ID
func (r *RailwayRepository) GetTrackByID(id int) (*models.Track, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	track, exists := r.trackIndex[id]
	if !exists {
		return nil, fmt.Errorf("track %d not found", id)
	}
	return track, nil
}

// GetAllSignals returns all unique signals
func (r *RailwayRepository) GetAllSignals() []models.Signal {
	r.mu.RLock()
	defer r.mu.RUnlock()

	signals := make([]models.Signal, 0, len(r.signalIndex))
	for _, signal := range r.signalIndex {
		signals = append(signals, *signal)
	}
	return signals
}

// GetSignalByID gets a signal by ID
func (r *RailwayRepository) GetSignalByID(id int) (*models.Signal, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	signal, exists := r.signalIndex[id]
	if !exists {
		return nil, fmt.Errorf("signal %d not found", id)
	}
	return signal, nil
}

// GetTracksBySignalID gets tracks for a signal
func (r *RailwayRepository) GetTracksBySignalID(signalID int) ([]models.Track, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	trackIDs, exists := r.signalTracks[signalID]
	if !exists {
		return []models.Track{}, nil
	}

	tracks := make([]models.Track, 0, len(trackIDs))
	for _, trackID := range trackIDs {
		if track, ok := r.trackIndex[trackID]; ok {
			tracks = append(tracks, *track)
		}
	}
	return tracks, nil
}