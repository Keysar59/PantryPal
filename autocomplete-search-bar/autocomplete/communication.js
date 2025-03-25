// Import node-fetch. If you're using Node.js 18+ you might use the built-in fetch instead.
//const fetch = require('node-fetch');
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Communicate with the server by sending an HTTP request.
 *
 * @param {string} url - The full URL of your server endpoint.
 * @param {Object} options - The fetch options (method, headers, body, etc.).
 * @returns {Promise<Object>} - The server response as JSON.
 */
async function communicateWithServer(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error communicating with server:", error);
    throw error;
  }
}



async function getProductsOptionsByName(name, page=1) {
    const url = `${BASE_URL}/product_fetching/get_product_by_name?name=${encodeURIComponent(name)}&page=${page}`;
    
    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    };
  
    const result = await communicateWithServer(url, options);
    return result;
}

async function getProductByBarcode(barcode) {
    const url = `${BASE_URL}/product_fetching/get_product_by_barcode?barcode=${encodeURIComponent(barcode)}`;
  
    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    };
  
    try {
      const result = await communicateWithServer(url, options);
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Request failed:", error);
    }
}

async function addProductToList(listId, quantity, product) {
    const url = `${BASE_URL}/list/add_product_to_list?list_id=${listId}&quantity=${quantity}`;
  
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    };
  
    try {
      const result = await communicateWithServer(url, options);
      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Failed to add product to list:", error);
    }
}
  
module.exports = {
    communicateWithServer,
    getProductsOptionsByName,
    getProductByBarcode,
    addProductToList,
  };
