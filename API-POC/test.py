import sys
from factory import ProductDataService, DataFetchStrategyFactory
import json

sys.stdout.reconfigure(encoding='utf-8')

service = ProductDataService(DataFetchStrategyFactory.create_strategy("webscraper"))
data = service.get_product_data("7290004127800")
print(json.dumps(data, ensure_ascii=False, indent=2))
#the image is in base64, so we need to decode
