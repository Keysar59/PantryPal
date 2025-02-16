import sqlite3
from typing import Optional, List
from app.domain.entities.user import User
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface

class UserRepositorySQL(UserRepositoryInterface):
    def __init__(self):
        self.db_path = "app.db"  # You can change this path as needed
        self._create_table()
    
    def _create_table(self):
        """Initialize the users table if it doesn't exist"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    email TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL
                )
            ''')
            conn.commit()

    def create_user(self, user_data: User):

    def get_user_password(self):

    def user_exists():
        