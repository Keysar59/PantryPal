import psycopg2
import os
from random import randint
from psycopg2.extras import DictCursor
from dotenv import load_dotenv
from app.domain.entities.products_list import ProductsList
from app.domain.entities.product import Product
from app.domain.repositories_interfaces.products_list_repository_interface import ProductsListRepositoryInterface
from typing import Optional


# Load environment variables
load_dotenv()



class ListRepositorySQL(ProductsListRepositoryInterface):
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
        query = '''
                    CREATE TABLE IF NOT EXISTS list_to_products (
                        list_id INT,
                        product_id VARCHAR(255),
                        product_name VARCHAR(255) NOT NULL,
                        image_url TEXT NULL,
                        quantity INT NOT NULL,
                        PRIMARY KEY (list_id, product_id)
                    )
                '''

        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                conn.commit()

    def _delete_tables(self):
        """
        Drops the list_to_products table if it exists.
        """
        query = "DROP TABLE IF EXISTS list_to_products"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                conn.commit()
        


    def add_product_to_list(self, list_id: int, product: Product, quantity: int) -> bool:
        """
        Adds product to list, if exists already adds quantity to current amount.
        """

        product_id = product.product_id
    
        # Checks if product exists in list already.
        query = "SELECT quantity FROM list_to_products WHERE list_id = %s and product_id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (list_id, product_id))
                results = cursor.fetchone()

        if results:  # If exists adds the quantity to current amount.
            new_amount = int(results[0]) + quantity
            query = "UPDATE list_to_products SET quantity = %s WHERE list_id = %s and product_id = %s"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (new_amount, list_id, product_id))

            return True
            
        else:  # If it doesn't, adds it to the list with given quantity.
            query = '''
            INSERT INTO list_to_products (list_id, product_id, product_name, image_url, quantity) 
            VALUES (%s, %s, %s, %s, %s)
            '''
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (list_id, product.product_id, product.product_name, product.product_image_url, quantity))
                    conn.commit()
            
            return True

        return False


    def remove_product_from_list(self, list_id: int, product_id: str, quantity: int):
        """
        Removes product from list, if quantity is 0 after removal, deletes the entry from the table. 
        """
        query = "SELECT quantity FROM list_to_products WHERE list_id = %s and product_id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (list_id, product_id))
                results = cursor.fetchone()

        if results and results[0] == quantity:  # If quantity is same as current amount deletes entry.
            query = "DELETE FROM list_to_products WHERE list_id = %s and product_id = %s"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (list_id, product_id))

            return True
            
        elif results and results[0] > quantity: # Else if the amount is greater then the quantity to remove, removes quantity from current amount.
            new_amount = int(results[0]) - quantity
            query = "UPDATE list_to_products SET quantity = %s WHERE list_id = %s and product_id = %s"
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (new_amount, list_id, product_id))

            return True

        return False

    def get_products_from_list(self, list_id: int) -> list[tuple[Product, int]]:
        """
        Fetches the products from a certain list, returns a list of tuples where the first cell is the product and the second is it's amount.
        """

        query = "SELECT product_id, product_name, image_url, quantity FROM list_to_products WHERE list_id = %s"
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (list_id, ))
                results = cursor.fetchall()
        
        # Transform results to match the return type.
        transformed_results = []
        for product_id, product_name, image_url, quantity in results:
            product = Product(
                product_id=product_id,
                product_name=product_name,
                product_image_url=image_url
            )
            transformed_results.append((product, quantity))
        
        return transformed_results
        

