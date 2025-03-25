class Product {
    constructor(product_id, product_name, product_image_url) {
      this.product_id = product_id;
      this.product_name = product_name;
      this.product_image_url = product_image_url;
    }
  
    getProductDetails() {
      return {
        product_id: this.product_id,
        product_name: this.product_name,
        product_image_url: this.product_image_url,
      };
    }
  
    setProductDetails({ product_id, product_name, product_image_url }) {
      if (product_id) this.product_id = product_id;
      if (product_name) this.product_name = product_name;
      if (product_image_url) this.product_image_url = product_image_url;
    }
  }