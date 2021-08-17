package main

import (
	"encoding/json"
	"github.com/Mindgamesnl/OpenAudioMc/scripts/prepare-documentation/md_loader"
	"io/ioutil"
)

func main()  {
	var pageMeta = md_loader.LoadPages()
	file, _ := json.MarshalIndent(pageMeta, "", " ")

	_ = ioutil.WriteFile("../../docs/tags.json", file, 0644)
}
