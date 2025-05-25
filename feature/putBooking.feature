Feature: Update Booking API

  Scenario Outline: Create, retrieve, authenticate and update a booking
    Given I have a booking payload with firstname "<firstname>", lastname "<lastname>", checkin "<checkin>", and checkout "<checkout>"
    When I create the booking
    Then the booking is created with status <createStatus>
    And the booking response should contain firstname "<firstname>" and lastname "<lastname>"
    And the booking dates should be "<checkin>" to "<checkout>"

    When I retrieve the booking by ID
    Then the booking retrieval is successful with status <getStatus>

    When I generate a token
    And I update the booking using PUT
    Then the booking is updated with status <putStatus>
    And the updated booking response should contain firstname "<updatedFirstname>" and lastname "<updatedLastname>"

    Examples:
      | firstname | lastname  | checkin     | checkout    | createStatus | getStatus | putStatus | updatedFirstname | updatedLastname |
      | Audy      | Chavarria | 2018-01-01  | 2019-01-01  | 200          | 200       | 200       | Angie            | Rojas           |