# Build stage
FROM golang:1.25.1-alpine3.22 AS builder

WORKDIR /app

# Copy all source files
COPY . .

# Build the Go binary
RUN go build -o counter-app .

# Final stage
FROM alpine:latest

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/counter-app .

# Expose port
EXPOSE 1337

# Run the app
CMD ["./counter-app"]