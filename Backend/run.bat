set DATABASE_URL=postgres://avnadmin:AVNS__zCRQbR-tajIatpRual@pg-bb3911c-pantrypal.g.aivencloud.com:18539/defaultdb?sslmode=require
python -muvicorn app.main:app --reload