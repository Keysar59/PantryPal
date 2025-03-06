# Use the official Python image
FROM python:3.12-slim

USER root

# Set the working directory inside the container
WORKDIR /Backend

RUN apt-get update && apt-get install -y gcc libpq-dev python3-dev


# Copy only requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . ./

# Set the command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]