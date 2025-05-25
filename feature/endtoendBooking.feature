Feature: Booking API End-to-End

  Scenario Outline: Successfully create and delete a booking
    Given I have a valid booking payload with firstname "<firstname>", lastname "<lastname>", checkin "<checkin>" and checkout "<checkout>"
    When I create a new booking
    Then the booking is created successfully with status <createStatus>
    When I retrieve the booking by its id
    Then the booking details are correct with status <getStatus>
    When I generate an authentication token
    And I delete the booking
    Then the booking is deleted successfully with status <deleteStatus>

    Examples:
      | firstname | lastname  | checkin     | checkout    | createStatus | getStatus | deleteStatus |
      | Audy      | Chavarria | 2018-01-01  | 2019-01-01  | 200          | 200       | 201          |
      | Maria     | Gómez     | 2022-05-10  | 2022-05-20  | 200          | 200       | 201          |