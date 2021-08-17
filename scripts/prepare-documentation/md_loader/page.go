package md_loader

type DocumentationPage struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Path        string `json:"path"`
	Tags        []string `json:"tags"`
}
