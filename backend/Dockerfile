# Stage 1: Build the Django app
FROM python:3.9 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Stage 2: Run the Django app
FROM python:3.9-slim

# Install PostgreSQL client libraries and GCC
RUN apt-get update
RUN apt-get install -y libpq-dev gcc
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN pip install psycopg2-binary
# Set the working directory in the container
WORKDIR /app

# Copy the installed dependencies from the build stage
COPY --from=build /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

# Copy the application code from the build stage
COPY --from=build /app /app

# Expose port 8000
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

