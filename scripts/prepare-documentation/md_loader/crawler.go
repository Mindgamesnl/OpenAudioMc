package md_loader

import (
	"os"
	"path/filepath"
	"strings"
)

func FindDocPages() []string {
	searchDir := "../../docs/"

	fileList := make([]string, 0)
	e := filepath.Walk(searchDir, func(path string, f os.FileInfo, err error) error {
		if strings.Contains(strings.ToLower(path), ".md") {
			fileList = append(fileList, path)
		}
		return err
	})

	if e != nil {
		panic(e)
	}

	return fileList
}
