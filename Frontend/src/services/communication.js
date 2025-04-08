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
  const { method = 'GET', headers = {}, body } = options;
    const response = await axios({
      url,
      method,
      headers,
      data: body, 
      withCredentials: true, 

    });

    return deepParseJSON(response.data);
}

async function checkStatus() {
  const url = `${BASE_URL}/auth/status`
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
}

async function login(email, password) {
  const url = `${BASE_URL}/auth/login`;
  const payload = { email, password };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  };
  const result = await communicateWithServer(url, options);
  return result;
};

async function signup(email, password) {
  const url = `${BASE_URL}/auth/signup`;
  const payload = { email, password };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  };
  
  const result = await communicateWithServer(url, options);
  return result;
}

async function joinGroup(groupId) {
  const url = `${BASE_URL}/group/join_group`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: groupId,
  };
  const result = await communicateWithServer(url, options);
  return result;
}

async function getGroups() {
  const url = `${BASE_URL}/group/get_groups`;
  
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
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

async function getListsIds(groupId) {
  const url = `${BASE_URL}/group/get_list_ids_by_group_id?group_id=${encodeURIComponent(groupId)}`;

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
}


async function deleteGroup(groupId) {
  const url = `${BASE_URL}/group/delete_group?group_id=${encodeURIComponent(groupId)}`;

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
}

async function getProductsFromList(ListId) {
  const url = `${BASE_URL}/list/get_products_from_list?list_id=${encodeURIComponent(list_id)}`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  const result = await communicateWithServer(url, options);
  return result;
}

export {
  communicateWithServer,
  getProductsOptionsByName,
  getProductByBarcode,
  addProductToList,
  login,
  signup,
  joinGroup,
  getGroups,
  checkStatus,
  getListsIds,
  deleteGroup,
  getProductsFromList,
};
