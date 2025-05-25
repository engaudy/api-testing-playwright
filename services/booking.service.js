const { request } = require('@playwright/test');
const BASE_URL = require('../utils/baseUrl');

const createBooking = async (body) => {
  const apiRequest = await request.newContext({ baseURL: BASE_URL });
  return await apiRequest.post('/booking', { data: body });
};

const getBookingById = async (id) => {
  const apiRequest = await request.newContext({ baseURL: BASE_URL });
  return await apiRequest.get(`/booking/${id}`);
};

const deleteBooking = async (id, token) => {
  const apiRequest = await request.newContext({ baseURL: BASE_URL });
  return await apiRequest.delete(`/booking/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`
    }
  });
};

const updateBooking = async (id, body, token) => {
  const apiRequest = await request.newContext({ baseURL: BASE_URL });
  return await apiRequest.put(`/booking/${id}`, {
    data: body,
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`
    }
  });
}

module.exports = { createBooking, getBookingById, deleteBooking, updateBooking};
