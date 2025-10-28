#!/bin/sh
set -e

echo "Entrypoint script started..."
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

# Проверяем, что entrypoint.sh существует и исполняемый
if [ ! -x "./entrypoint.sh" ]; then
    echo "ERROR: entrypoint.sh is not executable!"
    echo "Current permissions:"
    ls -la entrypoint.sh
    echo "Attempting to fix permissions..."
    chmod +x entrypoint.sh
fi

echo "Waiting for database to be ready..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Database is ready!"

echo "Running database migrations..."
if [ -f "./migrate" ]; then
    ./migrate up
    echo "Migrations completed!"
else
    echo "ERROR: migrate binary not found!"
    exit 1
fi

echo "Starting application..."
if [ -f "./parser" ]; then
    exec ./parser
else
    echo "ERROR: parser binary not found!"
    exit 1
fi
