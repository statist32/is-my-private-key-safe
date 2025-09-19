package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

var (
	counter int
	mu      sync.Mutex
)

func main() {
	http.HandleFunc("/increment", corsMiddleware(incrementHandler))
	http.HandleFunc("/checks", corsMiddleware(checksHandler))

	log.Println("Starting HTTPS server on :1337")
	err := http.ListenAndServeTLS(
		":1337",
		"/etc/letsencrypt/live/api.is-my-private-key-safe.com/fullchain.pem",
		"/etc/letsencrypt/live/api.is-my-private-key-safe.com/privkey.pem",
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
		// Allow any origin (for development)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Allow common headers/methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}
