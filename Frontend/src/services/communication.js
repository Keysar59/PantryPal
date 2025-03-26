import axios from 'axios';

const BASE_URL = 'https://pantry-pal-keysar59-dev.apps.rm2.thpm.p1.openshiftapps.com/api/v1';

function deepParseJSON(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.warn("Failed to parse JSON:", data);
      return data;
    }
  } else if (Array.isArray(data)) {
    return data.map(deepParseJSON); // Recursively parse each element in the array
  } else if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, deepParseJSON(value)])
    );
  }
  return data; // Return unchanged if it's neither a string, array, nor object
}
/**
 * Communicate with the server by sending an HTTP request using Axios.
 *
 * @param {string} url - The full URL of your server endpoint.
 * @param {Object} options - The options including method, headers, data, etc.
 * @returns {Promise<Object>} - The server response as JSON.
 */
async function communicateWithServer(url, options = {}) {
  try {
    const { method = 'GET', headers = {}, body } = options;
    const response = await axios({
      url,
      method,
      headers,
      data: body, 
      withCredentials: true, 

    });

    return deepParseJSON(response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Server responded with status ${error.response.status}:`, error.response.data);
    } else {
      console.error("Error communicating with server:", error.message);
    }
    throw error;
  }
}

async function getProductsOptionsByName(name, page = 1) {
  const url = `${BASE_URL}/product_fetching/get_product_by_name?name=${encodeURIComponent(name)}&page=${page}`;
  
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
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
      'Accept': 'application/json',
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
}

async function addProductToList(listId, quantity, product) {
  const url = `${BASE_URL}/list/add_product_to_list?list_id=${listId}&quantity=${quantity}`;

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: product,
  };

  const result = await communicateWithServer(url, options);
  return result;
}

export {
  communicateWithServer,
  getProductsOptionsByName,
  getProductByBarcode,
  addProductToList,
};
