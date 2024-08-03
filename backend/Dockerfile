FROM python:3.9 AS build

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.9-slim

RUN apt-get update
RUN apt-get install -y libpq-dev gcc
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN pip install psycopg2-binary

WORKDIR /app

COPY --from=build /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /app /app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

