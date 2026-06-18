package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"time"
)

type marker struct {
	ID       string  `json:"id"`
	Title    string  `json:"title"`
	Region   string  `json:"region"`
	Category string  `json:"category"`
	Date     string  `json:"date"`
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Shape    string  `json:"shape"`
	Status   string  `json:"status"`
	Summary  string  `json:"summary"`
	URL      string  `json:"url"`
}

var idPattern = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)

func main() {
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		fail(errors.New("could not resolve validator path"))
	}

	base := filepath.Dir(thisFile)
	siteRoot := filepath.Dir(base)
	if err := validatePreview(base); err != nil {
		fail(err)
	}
	if err := validateProduction(siteRoot); err != nil {
		fail(err)
	}

	fmt.Println("global map validation passed")
}

func fail(err error) {
	fmt.Fprintf(os.Stderr, "global map validation failed: %v\n", err)
	os.Exit(1)
}

func validatePreview(base string) error {
	if err := underBudget(filepath.Join(base, "map-background-preview.html"), 64*1024); err != nil {
		return err
	}
	if err := underBudget(filepath.Join(base, "global-map-updates.json"), 12*1024); err != nil {
		return err
	}
	if err := underBudget(filepath.Join(base, "global-cream-map-reference.webp"), 220*1024); err != nil {
		return err
	}
	if err := exists(filepath.Join(base, "legacy-painterly-study-preview.html")); err != nil {
		return err
	}

	if err := validateMarkers(base, filepath.Join(base, "global-map-updates.json")); err != nil {
		return err
	}

	return nil
}

func validateProduction(siteRoot string) error {
	if err := underBudget(filepath.Join(siteRoot, "global-map-updates.json"), 12*1024); err != nil {
		return err
	}
	if err := underBudget(filepath.Join(siteRoot, "images", "global-cream-map-reference.webp"), 220*1024); err != nil {
		return err
	}
	if err := validateMarkers(siteRoot, filepath.Join(siteRoot, "global-map-updates.json")); err != nil {
		return err
	}

	return nil
}

func validateMarkers(base, dataPath string) error {
	content, err := os.ReadFile(dataPath)
	if err != nil {
		return err
	}

	var markers []marker
	if err := json.Unmarshal(content, &markers); err != nil {
		return err
	}
	if len(markers) == 0 {
		return fmt.Errorf("%s must contain at least one marker", filepath.Base(dataPath))
	}

	ids := map[string]bool{}
	for index, item := range markers {
		if err := validateMarker(base, index, item, ids); err != nil {
			return fmt.Errorf("%s: %w", filepath.Base(dataPath), err)
		}
	}

	return nil
}

func validateMarker(base string, index int, item marker, ids map[string]bool) error {
	prefix := fmt.Sprintf("marker %d", index+1)
	if item.ID == "" || !idPattern.MatchString(item.ID) {
		return fmt.Errorf("%s has invalid id %q", prefix, item.ID)
	}
	if ids[item.ID] {
		return fmt.Errorf("%s has duplicate id %q", prefix, item.ID)
	}
	ids[item.ID] = true

	required := map[string]string{
		"title":    item.Title,
		"region":   item.Region,
		"category": item.Category,
		"date":     item.Date,
		"summary":  item.Summary,
		"url":      item.URL,
	}
	for field, value := range required {
		if value == "" {
			return fmt.Errorf("%s missing %s", prefix, field)
		}
	}

	if item.X < 0 || item.X > 100 || item.Y < 0 || item.Y > 100 {
		return fmt.Errorf("%s coordinates out of range: x=%v y=%v", prefix, item.X, item.Y)
	}
	if item.Shape != "square" && item.Shape != "dot" {
		return fmt.Errorf("%s has unsupported shape %q", prefix, item.Shape)
	}
	if item.Status != "active" && item.Status != "updated" && item.Status != "watch" {
		return fmt.Errorf("%s has unsupported status %q", prefix, item.Status)
	}
	if _, err := time.Parse("2006-01-02", item.Date); err != nil {
		return fmt.Errorf("%s has invalid date %q", prefix, item.Date)
	}
	if err := validateURL(base, item.URL); err != nil {
		return fmt.Errorf("%s url invalid: %w", prefix, err)
	}

	return nil
}

func validateURL(base, value string) error {
	parsed, err := url.Parse(value)
	if err != nil {
		return err
	}
	if parsed.IsAbs() {
		return nil
	}

	cleanPath := filepath.Clean(filepath.Join(base, value))
	return exists(cleanPath)
}

func exists(path string) error {
	info, err := os.Stat(path)
	if err != nil {
		return err
	}
	if info.IsDir() {
		return fmt.Errorf("%s is a directory, expected file", path)
	}
	return nil
}

func underBudget(path string, maxBytes int64) error {
	info, err := os.Stat(path)
	if err != nil {
		return err
	}
	if info.Size() > maxBytes {
		return fmt.Errorf("%s is %d bytes, above %d byte budget", path, info.Size(), maxBytes)
	}
	return nil
}
