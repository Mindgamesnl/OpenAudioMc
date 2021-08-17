package md_loader

import (
	"bufio"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func parseMarkdownComments(files []string) []DocumentationPage {
	pageList := make([]DocumentationPage, 0)
	for i := range files {
		file, err := os.Open(files[i])
		if err != nil {
			log.Fatal(err)
		}

		scanner := bufio.NewScanner(file)

		var page = DocumentationPage{}

		for scanner.Scan() {
			var line = scanner.Text()

			if strings.Contains(line, "[//]: # (") {
				// it is a comment!
				if last := len(line) - 1; last >= 0 && line[last] == ')' {
					line = line[:last]
				}
				line = trim(line)

				var key = strings.Split(line, ":")[0]
				var value = strings.Split(line, ":")[1]

				switch key {
				case "TITLE":
					page.Title = value
					break

				case "DESCRIPTION":
					page.Description = value
					break

				case "TAGS":
					page.Tags = strings.Split(value, ",")
				}
			}
		}

		filename := filepath.Base(files[i])
		page.Path = filename

		pageList = append(pageList, page)

		file.Close()
	}
	return pageList
}

func trim(s string) string {
	if idx := strings.Index(s, "("); idx != -1 {
		return s[idx+1:]
	}
	return s
}
