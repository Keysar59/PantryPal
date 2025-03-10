from app.infrastructures.external_apis.barcode_api_client import BarcodeApiClient
import requests
from app.domain.entities.product import product_to_json, products_to_json_list
def main():
    client = BarcodeApiClient()
    
    print("\nTesting get_product_by_name:")
    try:
        name_result = client.get_products_by_name("chocolate", page=3)
        if len(name_result) > 0:
            print(f"page 3, 10 products: \n{products_to_json_list(name_result)}")
        else:
            print("No products found by name")
    except requests.ConnectionError as e:
        print(f"Network connection error while getting product by name: {str(e)}")
    except requests.Timeout as e:
        print(f"Timeout error while getting product by name: {str(e)}")
    except ValueError as e:
        print(f"Invalid data received for product name search: {str(e)}")
    except Exception as e:
        print(f"Unexpected error while getting product by name: {str(e)}")
        
    print("\n--------------------------------\n")
    
    print("\nTesting get_product_by_barcode:")
    try:
        barcode_result = client.get_product_by_barcode("7290004127800")
        if barcode_result:
            print(f"Product by barcode: {product_to_json(barcode_result)}")
        else:
            print("No product found by barcode")
    except requests.ConnectionError as e:
        print(f"Network connection error while getting product by barcode: {str(e)}")
    except requests.Timeout as e:
        print(f"Timeout error while getting product by barcode: {str(e)}")
    except ValueError as e:
        print(f"Invalid data received for barcode search: {str(e)}")
    except Exception as e:
        print(f"Unexpected error while getting product by barcode: {str(e)}")
    
    print("\n--------------------------------\n")

    print("\nTesting get_products_by_category:")
    try:
        category_result = client.get_products_by_category("chocolates")
        if len(category_result) > 0:
            print(f"page 1, 10 products: \n{products_to_json_list(category_result)}")
        else:
            print("No products found by category")
    except requests.ConnectionError as e:
        print(f"Network connection error while getting products by category: {str(e)}")
    except requests.Timeout as e:
        print(f"Timeout error while getting products by category: {str(e)}")
    except ValueError as e:
        print(f"Invalid data received for category search: {str(e)}")
    except Exception as e:
        print(f"Unexpected error while getting products by category: {str(e)}")

if __name__ == "__main__":
    main()
