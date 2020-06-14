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
		MaxVoiceRoomSize     int    `json:"max_voice_room_size"`
		CallTimeout          int    `json:"call_timeout"`
		ProductionBackend    string `json:"production_backend"`
		DevelopmentBackend   string `json:"development_backend"`
	} `json:"configuration"`
}

type ServerStatus struct {
	Errors   []interface{} `json:"errors"`
	Response struct {
		TotalConnections int `json:"totalConnections"`
		MinecraftPlayers int `json:"minecraftPlayers"`
		Relays           []struct {
			ID               int    `json:"id"`
			RelayID          string `json:"relayId"`
			Connections      string `json:"connections"`
			UpdatedAt        string `json:"updated_at"`
			CreatedAt        string `json:"created_at"`
			InsecureEndpoint string `json:"insecureEndpoint"`
			SecureEndpoint   string `json:"secureEndpoint"`
		} `json:"relays"`
		VoiceServers []struct {
			ID            int    `json:"id"`
			VoiceServerID string `json:"voiceServerId"`
			Connections   string `json:"connections"`
			UpdatedAt     string `json:"updated_at"`
			CreatedAt     string `json:"created_at"`
			Host          string `json:"host"`
			Password      string `json:"password"`
		} `json:"voiceServers"`
	} `json:"response"`
}


func (config ProductionValues) GetApi() string {
	env := os.Getenv("OA_ENV")
	if env == "" {
		return config.Configuration.ProductionBackend
	}

	if env == "DEV" {
		return config.Configuration.DevelopmentBackend
	}

	return config.Configuration.ProductionBackend
}

func GetProductionConfiguration() *ProductionValues {
	var productionValues *ProductionValues = &ProductionValues{}
	getJson("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", productionValues)
	return productionValues
}

func getJson(url string, target interface{}) interface{} {
	client := &http.Client{Timeout: 10 * time.Second}
	r, err := client.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()
	bodyBytes, err := ioutil.ReadAll(r.Body)

	encodeError := json.Unmarshal(bodyBytes, target)
	if encodeError != nil {
		logrus.Error(encodeError)
	}
	return target
}

