FROM golang:tip-alpine3.22 as build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM golang:tip-alpine3.22

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=build /app/main .

EXPOSE 8081

ENV PORT=8081

CMD [ "./main" ]