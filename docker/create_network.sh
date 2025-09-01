#!/bin/bash

# Network name
NETWORK_NAME="nestjs_playground_network"

# Check if the network exists
if docker network ls --format '{{.Name}}' | grep -w "$NETWORK_NAME"; then
  echo "Network '$NETWORK_NAME' already exists ✅"
else
  echo "Network '$NETWORK_NAME' not found. Creating..."
  docker network create "$NETWORK_NAME"
  echo "Network '$NETWORK_NAME' created ✅"
fi