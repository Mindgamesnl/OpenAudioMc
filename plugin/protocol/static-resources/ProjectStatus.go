package staticresources

// One of the few public bits of the backend
// Just here for convenience
type ProductionValues struct {
	Versioning struct {
		VersionTag           string `json:"version_tag"`
		VersionImportance    string `json:"version_importance"`
		VersionUpdateMessage string `json:"version_update_message"`
	} `json:"versioning"`

	Announcement struct {
		IsAnnouncement       bool   `json:"is_announcement"`
		AnnouncementMessage  string `json:"announcement_message"`
	} `json:"announcement"`

	Configuration struct {
		MaxVoiceRoomSize     int `json:"max_voice_room_size"`
		CallTimeout          int `json:"call_timeout"`
	} `json:"configuration"`
}
