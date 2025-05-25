const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const bookingRequestTemplate = require('../../test-data/post_dynamic_request_body.json');
const { formatBookingPayload } = require('../../utils/common');
const { createBooking, getBookingById, deleteBooking } = require('../../services/booking.service');
const { generateToken } = require('../../services/auth.service');

let bookingId;
let bookingResponse;
let bookingData;
let getResponse;
let token;
let deleteResponse;

Given(
  'I have a valid booking payload with firstname {string}, lastname {string}, checkin {string} and checkout {string}',
  function (firstname, lastname, checkin, checkout) {
    bookingData = formatBookingPayload(
      bookingRequestTemplate,
      firstname,
      lastname,
      checkin,
      checkout
    );
  }
);

When('I create a new booking', async function () {
  bookingResponse = await createBooking(bookingData);
  const responseBody = await bookingResponse.json();
  bookingId = responseBody.bookingid;
  bookingData = responseBody.booking;
});

Then('the booking is created successfully with status {int}', function (expectedStatus) {
  expect(bookingResponse.ok()).toBeTruthy();
  expect(bookingResponse.status()).toBe(expectedStatus);
});

When('I retrieve the booking by its id', async function () {
  getResponse = await getBookingById(bookingId);
});

Then('the booking details are correct with status {int}', async function (expectedStatus) {
  expect(getResponse.ok()).toBeTruthy();
  expect(getResponse.status()).toBe(expectedStatus);
});

When('I generate an authentication token', async function () {
  token = await generateToken();
});

When('I delete the booking', async function () {
  deleteResponse = await deleteBooking(bookingId, token);
});

Then('the booking is deleted successfully with status {int}', function (expectedStatus) {
  expect(deleteResponse.status()).toBe(expectedStatus);
});
