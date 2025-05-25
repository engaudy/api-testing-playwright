export const formatBookingPayload = (template, firstname, lastname, checkin, checkout) => {
  const cloned = JSON.parse(JSON.stringify(template));
  cloned.firstname = firstname;
  cloned.lastname = lastname;
  cloned.bookingdates.checkin = checkin;
  cloned.bookingdates.checkout = checkout;
  return cloned;
};
