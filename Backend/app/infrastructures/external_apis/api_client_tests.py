from barcode_api_client import BarcodeApiClient
import requests

def main():
    client = BarcodeApiClient()
    
    print("\nTesting get_product_by_name:")
    try:
        name_result = client.get_product_by_name("chocolate")
        if name_result and "products" in name_result and len(name_result["products"]) > 0:
            print(f"First product by name: {name_result['products'][0]}")
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
        barcode_result = client.get_product_by_barcode("729000412780")
        if barcode_result and "product" in barcode_result:
            print(f"Product by barcode: {barcode_result['product']}")
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
        if category_result and "products" in category_result and len(category_result["products"]) > 0:
            print(f"First product by category: {category_result['products'][0]}")
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
