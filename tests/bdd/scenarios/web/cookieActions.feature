@web @cookies
Feature: Web Cookie Actions

  Background:
    * Web: Open browser -url: "https://letcode.in/forms" -options: "{}"

  @cookies_set
  Scenario: Set a cookie for the current origin
    * Web: Set Cookie -name: "playq_token" -value: "abc123" -options: "{ \"domain\": \"letcode.in\", \"path\": \"/\", \"secure\": false, \"httpOnly\": false, \"screenshot\": false }"
    * Web: Get Cookie -name: "playq_token" -options: "{ \"assert\": true, \"screenshot\": false }"

  @cookies_get
  Scenario: Get a cookie value
    * Web: Set Cookie -name: "playq_session" -value: "xyz789" -options: "{ \"domain\": \"letcode.in\", \"path\": \"/\", \"screenshot\": false }"
    * Web: Get Cookie -name: "playq_session" -options: "{ \"assert\": true, \"screenshot\": false }"

  @cookies_delete
  Scenario: Delete a cookie
    * Web: Set Cookie -name: "playq_token" -value: "del123"
    * Web: Delete Cookie -name: "playq_token"
    * Web: Get Cookie -name: "playq_token" -options: "{ \"assert\": false, \"screenshot\": false }"

  @cookies_clear
  Scenario: Clear all cookies in context
    * Web: Set Cookie -name: "cookie_one" -value: "one"
    * Web: Set Cookie -name: "cookie_two" -value: "two"
    * Web: Clear Cookies
