@forms @formactions
Feature: Form Actions - Fill and Type

  Background:
    Given Web: Open browser -url: "https://letcode.in/forms" -options: "{}"

  @forms_fill
  Scenario: Fill form field with PatternIQ
    When Web: Fill -field: "First Name" -value: "Jane Doe" -options: "{ 'pattern': 'letcodesamples' }"
    Then Web: Verify input field value -field: "First Name" -value: "gfjhg Doe" -options: "{ 'pattern': 'letcodesamples', 'partialMatch': true }"

  @forms_type
  Scenario: Type in form field with PatternIQ
    When Web: Type -field: "First Name" -value: "Jane D." -options: "{ 'pattern': 'letcodesamples' }"
    Then Web: Verify input field value -field: "First Name" -value: "Jane D." -options: "{ 'pattern': 'letcodesamples' }"
