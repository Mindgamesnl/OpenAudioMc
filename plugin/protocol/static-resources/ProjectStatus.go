package staticresources

type ProductionValues struct {
	Versioning struct {
		VersionTag           string `json:"version_tag"`
		VersionImportance    string `json:"version_importance"`
		VersionUpdateMessage string `json:"version_update_message"`
	} `json:"versioning"`

	Announcement struct {
		IsAnnouncement      bool   `json:"is_announcement"`
		AnnouncementMessage string `json:"announcement_message"`
	} `json:"announcement"`

	Configuration struct {
		MaxVoiceRoomSize int `json:"max_voice_room_size"`
	} `json:"configuration"`
}
