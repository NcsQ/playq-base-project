Feature: Comms - PowerShell Template Processing

  As a test automation engineer
  I want to process PowerShell script templates with variable substitution
  So that I can generate and execute parameterized scripts

  Background:
    * Comm: Comment -text: "Testing PowerShell Template Processing"

  # TEST 1: Generate Script File Only
  # Process the template and save the generated script to test-data folder
  # Variables from var.static.json are used (including Faker expressions)
  @powershell @template @generate
  Scenario: Generate PowerShell script file in test-data
    * Comm: Comment -text: "Generate script file without execution"
    * Comm: Process PowerShell Template -templateName: "test_run_script" -options: "{\"run\": false}"
    * Comm: Comment -text: "Script generated in test-data folder"

  # TEST 2: Generate and Execute Script
  # Process the template and immediately execute the generated script
  # Variables from var.static.json are used (including Faker expressions)
  @powershell @template @execute
  Scenario: Generate and execute PowerShell script
    * Comm: Comment -text: "Generate and run script in one step"
    * Comm: Process PowerShell Template -templateName: "test_run_script" -options: "{\"run\": true}"
    * Comm: Comment -text: "Script generated and executed"

  # TEST 3: Generate and Execute with Variable Overrides
  # Process the template with custom variable values and execute the script
  # Override specific variables while keeping others from var.static.json
  @powershell @template @execute-override
  Scenario: Generate and execute script with override variables
    * Comm: Comment -text: "Override MESSAGE variable and execute"
    * Comm: Process PowerShell Template -templateName: "test_run_script" -options: "{\"overrides\": {\"MESSAGE\": \"Custom message for this run\"}, \"run\": true}"
    * Comm: Comment -text: "Script executed with custom MESSAGE"
