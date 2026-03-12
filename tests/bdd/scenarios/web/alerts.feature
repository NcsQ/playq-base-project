@web @alerts
Feature: Web Alert Actions

  Background:
    * Web: Open browser -url: "https://letcode.in/alert" -options: "{}"

  @alerts_accept
  Scenario: Accept a simple alert
    * Web: Click button and Accept Alert -field: "Simple Alert" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @alerts_dismiss
  Scenario: Dismiss a confirm alert
    * Web: Click button and Dismiss Alert -field: "Confirm Alert" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @alerts_fill
  Scenario: Fill a prompt alert
    * Web: Click button and Fill Alert -field: "Prompt Alert" -text: "PlayQ" -options: "{ \"pattern\": \"letcodesamples\", \"screenshot\": false }"

  @alerts_see_text
  Scenario: Verify alert text
    * Web: Click button and See Alert Text -field: "Simple Alert" -expected: "Welcome to LetCode" -options: "{ \"pattern\": \"letcodesamples\", \"partialMatch\": true, \"ignoreCase\": true, \"assert\": true, \"screenshot\": false }"
