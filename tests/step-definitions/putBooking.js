const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const postBodyTemplate = require('../../test-data/post_dynamic_request_body.json');
const putRequestBody = require('../../test-data/put_request_body.json');

const { formatBookingPayload } = require('../../utils/common');
const {
  createBooking,
  getBookingById,
  updateBooking
} = require('../../services/booking.service');

const { generateToken } = require('../../services/auth.service');

let bookingPayload;
let postResponse, postResponseBody;
let bookingId;
let getResponse;
let putResponse, putResponseBody;
let token;

// Step: Create booking payload
Given(
  'I have a booking payload with firstname {string}, lastname {string}, checkin {string}, and checkout {string}',
  function (firstname, lastname, checkin, checkout) {
    bookingPayload = formatBookingPayload(postBodyTemplate, firstname, lastname, checkin, checkout);
  }
);

// Step: Create booking
When('I create the booking', async function () {
  postResponse = await createBooking(bookingPayload);
  postResponseBody = await postResponse.json();
  bookingId = postResponseBody.bookingid;
});

// Step: Validate booking creation
Then('the booking is created with status {int}', function (statusCode) {
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(statusCode);
});

// Step: Validate booking content
Then(
  'the booking response should contain firstname {string} and lastname {string}',
  function (firstname, lastname) {
    expect(postResponseBody.booking.firstname).toBe(firstname);
    expect(postResponseBody.booking.lastname).toBe(lastname);
  }
);

Then(
  'the booking dates should be {string} to {string}',
  function (checkin, checkout) {
    expect(postResponseBody.booking.bookingdates.checkin).toBe(checkin);
    expect(postResponseBody.booking.bookingdates.checkout).toBe(checkout);
  }
);

// Step: Get booking
When('I retrieve the booking by ID', async function () {
  getResponse = await getBookingById(bookingId);
});

// Step: Validate booking retrieval
Then('the booking retrieval is successful with status {int}', function (statusCode) {
  expect(getResponse.ok()).toBeTruthy();
  expect(getResponse.status()).toBe(statusCode);
});

// Step: Generate token
When('I generate a token', async function () {
  token = await generateToken();
});

// Step: Update booking
When('I update the booking using PUT', async function () {
  putResponse = await updateBooking(bookingId, putRequestBody, token);
  putResponseBody = await putResponse.json();
});

// Step: Validate PUT response
Then('the booking is updated with status {int}', function (statusCode) {
  expect(putResponse.ok()).toBeTruthy();
  expect(putResponse.status()).toBe(statusCode);
});

Then(
  'the updated booking response should contain firstname {string} and lastname {string}',
  function (firstname, lastname) {
    expect(putResponseBody.firstname).toBe(firstname);
    expect(putResponseBody.lastname).toBe(lastname);
  }
);
