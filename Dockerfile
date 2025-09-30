FROM node:18-alpine

WORKDIR /app

# Instalar herramientas necesarias para compilar dependencias nativas (bcrypt)
RUN apk add --no-cache python3 make g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de Express
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]
