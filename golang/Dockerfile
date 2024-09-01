# Etapa 1: Construir o binário
FROM golang:alpine AS builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Inicializar um módulo Go
RUN go mod init example.com/fullcycle

# Copiar o código fonte para dentro do container
COPY . .

# Compilar o binário, reduzindo o tamanho final
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o main .

# Etapa 2: Construir a imagem final mínima
FROM scratch

# Copiar o binário da etapa de construção
COPY --from=builder /app/main /main

# Definir o binário como o ponto de entrada
ENTRYPOINT ["/main"]