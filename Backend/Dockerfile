FROM python:3.12-slim

USER root

WORKDIR /Backend

RUN apt-get update && apt-get install -y gcc libpq-dev python3-dev

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./  

ENV PYTHONPATH="/Backend" 

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
