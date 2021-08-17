package md_loader

func LoadPages() []DocumentationPage {
	return parseMarkdownComments(FindDocPages())
}
