# Use Node.js with Debian Bullseye
FROM node:20-bullseye-slim

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Workaround Docker Desktop proxy bug & install Java + tools
RUN printf '\
Acquire::http::Pipeline-Depth "0";\n\
Acquire::http::No-Cache "true";\n\
Acquire::BrokenProxy "true";\n\
' > /etc/apt/apt.conf.d/99fixbadproxy \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      openjdk-17-jre \
      curl \
      unzip \
      git \
 && rm -rf /var/lib/apt/lists/*

# Install Firebase CLI
RUN curl -sL https://firebase.tools | bash

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/functions/package*.json ./backend/functions/

# Install dependencies
RUN npm --prefix frontend install \
 && npm --prefix backend/functions install

# Copy the rest of the project files
COPY . .

# Build frontend and backend with error handling
RUN sh -c '\
  echo "📦 Building frontend..." && \
  npm --prefix frontend run build && \
  echo "✅ Frontend build completed" && \
  echo "📦 Building backend..." && \
  npm --prefix backend/functions run build && \
  echo "✅ Backend build completed" && \
  echo "📁 Verifying builds..." && \
  ls -la frontend/dist/ && \
  ls -la backend/functions/lib/ \
'
 
# Expose ports for Firebase emulators
EXPOSE 5001 5002 9000 4000 8080 9099 9199

# Default command to start the emulators
CMD ["firebase", "emulators:start", "--only", "functions,database,hosting", "--project", "user-management-challenge"]