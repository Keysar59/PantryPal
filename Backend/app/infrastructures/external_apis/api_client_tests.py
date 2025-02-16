from barcode_api_client import BarcodeApiClient

def main():
    client = BarcodeApiClient()
    
    print("\nTesting get_product_by_name:")
    name_result = client.get_product_by_name("chocolate")
    if name_result and "products" in name_result and len(name_result["products"]) > 0:
        print(f"First product by name: {name_result['products'][0]}")
    else:
        print("No products found by name")
        
    print("\n--------------------------------\n")
    
    print("\nTesting get_product_by_barcode:")
    barcode_result = client.get_product_by_barcode("7290004127800")
    if barcode_result and "product" in barcode_result:
        print(f"Product by barcode: {barcode_result['product']}")
    else:
        print("No product found by barcode")
    
    print("\n--------------------------------\n")

    print("\nTesting get_products_by_category:")
    category_result = client.get_products_by_category("chocolates")
    if category_result and "products" in category_result and len(category_result["products"]) > 0:
        print(f"First product by category: {category_result['products'][0]}")
    else:
        print("No products found by category")

if __name__ == "__main__":
    main()
