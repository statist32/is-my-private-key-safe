package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

var (
	counter int
	mu      sync.Mutex
	file    = "/app/counter.txt"
)

func main() {
	// Load counter from file on startup
	loadCounter()

	// Periodically save counter to file every 5 minutes
	go saveCounterPeriodically()

	http.HandleFunc("/increment", corsMiddleware(incrementHandler))
	http.HandleFunc("/checks", corsMiddleware(checksHandler))

	log.Println("Starting HTTPS server on :1337")
	err := http.ListenAndServeTLS(
		":1337",
		"/app/fullchain.pem",
		"/app/privkey.pem",
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}
}

func incrementHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	counter++
	current := counter
	mu.Unlock()

	fmt.Fprintf(w, "Counter incremented. Current value: %d\n", current)
}

func checksHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	current := counter
	mu.Unlock()

	fmt.Fprintf(w, "%d\n", current)
}

// Simple CORS middleware
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Load counter from file
func loadCounter() {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		if os.IsNotExist(err) {
			log.Println("counter.txt not found, starting at 0")
			counter = 0
			return
		}
		log.Fatalf("Failed to read counter file: %v", err)
	}

	// Trim whitespace and newline
	strValue := strings.TrimSpace(string(data))
	value, err := strconv.Atoi(strValue)
	if err != nil {
		log.Fatalf("Invalid counter value in file: %v", err)
	}
	counter = value
	log.Printf("Loaded counter value: %d", counter)
}

// Save counter to file
func saveCounter() {
	mu.Lock()
	defer mu.Unlock()

	err := ioutil.WriteFile(file, []byte(strconv.Itoa(counter)), 0644)
	if err != nil {
		log.Printf("Failed to save counter: %v", err)
	} else {
		log.Printf("Counter saved: %d", counter)
	}
}

// Save counter periodically
func saveCounterPeriodically() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for {
		<-ticker.C
		saveCounter()
	}
}
