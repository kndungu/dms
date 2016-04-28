module.exports = function(res, error) {

  // Descrptive message of the failure to be sent to user
  var message;

  /* Sample saveError object
  {
     [ValidationError: Test validation failed]
     message: 'Test validation failed',
     name: 'ValidationError',
     errors: {
       'name.first': {
         [ValidatorError: First name must be provided]
         message: 'First name must be provided',
         name: 'ValidatorError',
         properties: [Object],
         kind: 'required',
         path: 'name.first',
         value: ''
       },
       'name.last': {
         [ValidatorError: Last name must be provided]
         message: 'Last name must be provided',
         name: 'ValidatorError',
         properties: [Object],
         kind: 'required',
         path: 'name.last',
         value: ''
       }
     }
   }
  */

  // Handle save errors due to validation
  if (error.name === 'ValidationError') {

    // Get the first validation that failed
    var failedValidations = Object.keys(error.errors);
    var firstFailed = failedValidations[0];

    // Get validation error message
    message = error.errors[firstFailed].message;
  }  else{
    // Handle unexpected errors
    message = error;
  }

  // Done, send to user
  res.status(400);
  res.json({
    success: false,
    message: message
  });
};
