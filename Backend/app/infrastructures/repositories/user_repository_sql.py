import psycopg2
import os
from psycopg2.extras import DictCursor
from dotenv import load_dotenv
from app.domain.entities.user import User
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface
from typing import Optional


# Load environment variables
load_dotenv()

class UserRepositorySQL(UserRepositoryInterface):
    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")
        self._delete_table()
        self._create_table()

    def _get_connection(self):
        """Creates a new database connection."""
        return psycopg2.connect(self.db_url, cursor_factory=DictCursor)

    def _create_table(self):
        """Initialize the users table if it doesn't exist"""
        query = '''
        CREATE TABLE IF NOT EXISTS users (
            email VARCHAR(255) PRIMARY KEY,
            password TEXT NOT NULL
        )
        '''
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                conn.commit()

    def _delete_table(self):
        """Drop the users table if it exists"""
        query = "DROP TABLE IF EXISTS users"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                conn.commit()

    def create_user(self, user_data: User):
        """Inserts a new user into the database."""
        query = '''
        INSERT INTO users (email, password) 
        VALUES (%s, %s)
        '''
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_data.email, user_data.password))
                conn.commit()
        return user_data

    def get_user_password(self, email: str) -> Optional[str]:
        """Fetches a user's password hash by email."""
        query = "SELECT password FROM users WHERE email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (email,))
                result = cursor.fetchone()
                return result[0] if result else None

    def user_exists(self, email: str) -> bool:
        """Checks if a user exists in the database."""
        query = "SELECT 1 FROM users WHERE email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (email,))
                return cursor.fetchone() is not None

    def get_user_by_email(self, user_email: str) -> Optional[User]:
        """Fetches a user by email."""
        query = "SELECT email, password FROM users WHERE email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_email,))
                result = cursor.fetchone()
                if result:
                    return User(email=result["email"], password=result["password"])
        return None

    def get_data(self):
        query = "SELECT * FROM users"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                data = cursor.fetchall()
                print("data = ", data)
                return data
