@web @forms @formactions
Feature: Web Form Actions

  Background:
    * Web: Open browser -url: "https://letcode.in/forms" -options: "{}"

  @forms_fill
  Scenario: Fill form field
    * Web: Fill -field: "First Name" -value: "Jane Doe" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Verify input field value -field: "First Name" -value: "Jane Doe" -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": false, \"assert\": true, \"screenshot\": false }"

  @forms_type
  Scenario: Type in form field
    * Web: Type -field: "First Name" -value: "Jane D." -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Verify input field value -field: "First Name" -value: "Jane D." -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": false, \"assert\": true, \"screenshot\": false }"

  @forms_enter
  Scenario: Enter value in form field
    * Web: Enter -field: "First Name" -value: "Enter Value" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Verify input field value -field: "First Name" -value: "Enter Value" -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": false, \"assert\": true, \"screenshot\": false }"

  @forms_input
  Scenario: Fill input in form field
    * Web: Fill input -field: "First Name" -value: "Input Value" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Verify input field value -field: "First Name" -value: "Input Value" -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": false, \"assert\": true, \"screenshot\": false }"

  @forms_set
  Scenario: Set value in form field
    * Web: Set -field: "First Name" -value: "Set Value" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Verify input field value -field: "First Name" -value: "Set Value" -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": false, \"assert\": true, \"screenshot\": false }"

  @forms_checkbox
  Scenario: Select checkbox in form
    * Web: Click checkbox -field: "I agree to the terms and conditions" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @forms_selectoptions
  Scenario: Select dropdown option by value
    * Web: Select Dropdown -field: "Country" -value: "India" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @forms_selectoptionbyindex
  Scenario: Select dropdown option by index
    * Web: Select Dropdown by Index -field: "Country" -index: 2 -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @forms_uploadfile
  Scenario: Upload file in form
    * Web: Open browser -url: "https://letcode.in/file" -options: "{}"
    * Web: Upload file at -field: "Choose a file" with filename: "lambdaTest.csv" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @forms_press_enter
  Scenario: Press Enter in form flow
    * Web: Type -field: "First Name" -value: "Enter Key" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"
    * Web: Press Enter -options: "{ \"screenshot\": false }"