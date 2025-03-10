import psycopg2
import os
from random import randint
from psycopg2.extras import DictCursor
from dotenv import load_dotenv
from app.domain.entities.prodcuts_list import ProductsList
from app.domain.entities.product import Product
from app.domain.repositories_interfaces.products_list_repository_interface import ProductsListRepositoryInterface
from typing import Optional


# Load environment variables
load_dotenv()



class GroupRepositorySQL(GroupRepositoryInterface):
    def __init__(self):
        """
        Initiate the repository. Creates table if necessary.
        """
        self.db_url = os.getenv("DATABASE_URL")
        # self._delete_tables()
        self._create_table()

    def _get_connection(self):
        """
        Creates a new database connection.
        """
        return psycopg2.connect(self.db_url, cursor_factory=DictCursor)

    def _create_table(self):
        """
        Initialize the list_to_products table if it doesn't exist.
        """
        query = 
            '''
                CREATE TABLE IF NOT EXISTS list_to_products (
                    list_id INT,
                    product_id INT,
                    product_name VARCHAR(255) NOT NULL,
                    image_url TEXT DEFAULT
                    quantity INT NOT NULL,
                    PRIMARY KEY (list_id, product_id)
                )
            '''

        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query)
                    conn.commit()

    def _delete_tables(self):
        """
        Drops the groups and user_to_groups tables if they exist.
        """
        queries = ["DROP TABLE IF EXISTS user_to_groups", "DROP TABLE IF EXISTS groups"]
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query)
                    conn.commit()
        


    def create_group(self, group_name: str, user_email: str) -> int:
        """
        Inserts a new group into the database.
        """
        id_found = False

        while not id_found:
            unique_id = randint(100000, 999999)

            query = "SELECT id FROM groups WHERE id = %s"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (unique_id, ))
                    results = cursor.fetchone()

            if not results:  # Makes sure id is not in use.
                id_found = True

        # TODO: Create new lists
        pantry_list_id = 1
        default_list_id = 1
        shopping_list_id = 1
        query = '''
        INSERT INTO groups (id, name, creator, pantry_list_id, default_list_id, shopping_list_id) 
        VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
        '''
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (unique_id, group_name, user_email, pantry_list_id, default_list_id, shopping_list_id))
                results = cursor.fetchone()
                conn.commit()

        if not results:  # Makes sure id was returned, meaning group was created successfully.
            return False # TODO: Raise error, failed creating group.
        group_id = results[0]
        return group_id


    def delete_group(self, group_id: int) -> bool:
        """
        Deletes the spesified group if exists from both lists.
        """
        queries = ["DELETE FROM user_to_groups WHERE group_id = %s ", "DELETE FROM groups WHERE id = %s "]
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                for query in queries:
                    cursor.execute(query, (group_id, ))
                    conn.commit()

        return True
