package models

// Track represents a railway track between stations
type Track struct {
	TrackID int      `json:"track_id"`
	Source  string   `json:"source"`
	Target  string   `json:"target"`
	Signals []Signal `json:"signal_ids"`
}

// IsValid checks if track has required data
func (t *Track) IsValid() bool {
	return t.TrackID > 0 && t.Source != "" && t.Target != ""
}

// GetSignalCount returns total signals
func (t *Track) GetSignalCount() int {
	return len(t.Signals)
}

// GetValidSignals returns signals with complete data
func (t *Track) GetValidSignals() []Signal {
	valid := make([]Signal, 0)
	for _, signal := range t.Signals {
		if signal.IsValid() {
			valid = append(valid, signal)
		}
	}
	return valid
}

// SignalTrackRelationship shows tracks for a signal
type SignalTrackRelationship struct {
	Signal Signal  `json:"signal"`
	Tracks []Track `json:"tracks"`
}