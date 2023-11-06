# InputMasker

InputMasker is a JavaScript class designed to create and manage input masking functionality for HTML input elements. It enforces a specific format by masking the input according to predefined rules.

## Overview

The InputMasker class is designed to be instantiated with certain parameters to facilitate input masking. These parameters include:

- `inputId`: The HTML input element's ID that needs masking.
- `allowedRegex`: Regular expression to specify allowed characters in the input.
- `maskCharacter`: The character used to mask the input.
- `maskLength`: The desired length for the input mask.
- `notAllowedCallback`: A callback function triggered when disallowed input is entered.

## How to Use

To use the InputMasker class, follow these steps:

1. Include the JavaScript file containing the InputMasker class in your HTML document.
2. Instantiate the InputMasker by providing the required parameters:
   ```javascript
   const inputMask = new InputMasker(
       'inputElementId',
       /[yourRegexPattern]/,
       'maskCharacter',
       maskLength,
       notAllowedCallbackFunction
   );
