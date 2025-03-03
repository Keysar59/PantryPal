import psycopg2
import os
from psycopg2.extras import DictCursor
from dotenv import load_dotenv
from app.domain.entities.group import Group
from app.domain.repositories_interfaces.group_repository_interface import GroupRepositoryInterface
from typing import Optional


# Load environment variables
load_dotenv()



class GroupRepositorySQL(GroupRepositoryInterface):
    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")
        # self._delete_tables()
        self._create_tables()

    def _get_connection(self):
        """Creates a new database connection."""
        return psycopg2.connect(self.db_url, cursor_factory=DictCursor)

    def _create_tables(self):
        """Initialize the groups and user_to_groups tables if it doesn't exist"""
        queries = [
            '''
                CREATE TABLE IF NOT EXISTS groups (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    creator VARCHAR(255) NOT NULL,
                    pantry_list_id INT NOT NULL,
                    default_list_id INT NOT NULL,
                    shopping_list_id INT NOT NULL
                )
            '''
            ,
            '''
                CREATE TABLE IF NOT EXISTS user_to_groups (
                    email VARCHAR(255),
                    group_id INT,
                    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
                    PRIMARY KEY (email, group_id),
                    FOREIGN KEY (group_id) REFERENCES groups(id)
                )
            '''
        ]

        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query)
                    conn.commit()

    def _delete_tables(self):
        """Drop the groups and user_to_groups tables if it exist"""
        queries = ["DROP TABLE IF EXISTS user_to_groups", "DROP TABLE IF EXISTS groups"]
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query)
                    conn.commit()



    def create_group(self, group_name: str, user_email: str) -> int:
        # TODO: Create new lists
        pantry_list_id = 1
        default_list_id = 1
        shopping_list_id = 1
        """Inserts a new group into the database."""
        query = '''
        INSERT INTO groups (name, creator, pantry_list_id, default_list_id, shopping_list_id) 
        VALUES (%s, %s, %s, %s, %s) RETURNING id
        '''
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_name, user_email, pantry_list_id, default_list_id, shopping_list_id))
                results = cursor.fetchone()
                conn.commit()

        if not results:
            return False # TODO: Raise error, no group found.
        group_id = results[0]
        return group_id

    def add_user_to_group(self, group_id: int, user_email: str):
        # TODO: Add notes
        query = "SELECT email FROM user_to_groups WHERE group_id = %s and email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))
                results = cursor.fetchone()

        if results:
            return False # TODO: Raise error, user already in group found.
        
        query = '''
        INSERT INTO user_to_groups (group_id, email) 
        VALUES (%s, %s)
        '''

        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))

        return True

        
    def remove_user_from_group(self, group_id: int, user_email: str):
        # TODO: Add notes
        query = "SELECT email, is_admin FROM user_to_groups WHERE group_id = %s and email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found or user not in group.

        query = "SELECT creator FROM groups WHERE id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, ))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found.
        if results[0] == user_email:
            return False # TODO: Raise error, user is the creator.
        
        query = "DELETE FROM user_to_groups WHERE group_id = %s and email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))
        
        return True
        

    def promote_user_to_admin(self, group_id: int, user_email: str):
        # TODO: Add notes
        query = "SELECT is_admin FROM user_to_groups WHERE group_id = %s and email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found.
        if results[0]:
            return False # TODO: Raise error, user already an admin.
        
        query = "UPDATE user_to_groups SET is_admin = TRUE WHERE group_id = %s AND email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))

        return True
        

    def demote_admin_to_user(self, group_id: int, user_email: str):
        query = "SELECT is_admin FROM user_to_groups WHERE group_id = %s and email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found.
        if not results[0]:
            return False # TODO: Raise error, user not an admin.

        
        query = "SELECT creator FROM groups WHERE id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, ))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found.
        if results[0] == user_email:
            return False # TODO: Raise error, user is the creator.
        

        query = "UPDATE user_to_groups SET is_admin = FALSE WHERE group_id = %s AND email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id, user_email))

        return True
      

    def get_groups_by_user_email(self, user_email: str) -> list[int]:
        # TODO: add notes
        query = "SELECT group_id FROM user_to_groups WHERE email = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_email,))
                results = cursor.fetchall()

        if not results:
            return False # TODO: Raise error, no group found.

        group_ids = []
        for result in results:
            group_ids.append(result[0])

        return group_ids

    def get_group_name_by_id(self, group_id: int) -> str:
        # TODO: add notes
        query = "SELECT name FROM groups WHERE id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (group_id,))
                results = cursor.fetchone()

        if not results:
            return False # TODO: Raise error, no group found.
        return results[0]

    def get_list_ids_by_group_id(self, group_id) -> list[int]:
        queries = [
            "SELECT pantry_list_id FROM groups WHERE id = %s",
            "SELECT default_list_id FROM groups WHERE id = %s",
            "SELECT shopping_list_id FROM groups WHERE id = %s"
        ]

        list_ids = []

        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query, (group_id,))
                    results = cursor.fetchone()
                    if not results:
                        return False # TODO: Raise error, no id found.
                    list_ids.append(results[0])

        return list_ids
                    