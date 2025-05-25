const { request } = require('@playwright/test');
const BASE_URL = require('../utils/baseUrl');
const tokenRequestBody = require('../test-data/token_request_body.json');

const generateToken = async () => {
  const apiRequest = await request.newContext({ baseURL: BASE_URL });
  const response = await apiRequest.post('/auth', { data: tokenRequestBody });
  const body = await response.json();
  return body.token;
};

module.exports = { generateToken };
